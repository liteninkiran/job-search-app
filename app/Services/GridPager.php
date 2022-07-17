<?php

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class GridPager {

    public int $rowCount;

    private array $params;
    private array $data;
    private string $table;
    private string $sql;

    public function __construct() { }

    public function setTable(string $table): GridPager
    {
        $this->table = $table;
        return $this;
    }

    public function setParams(array $params): GridPager
    {
        $this->params = $params;
        return $this;
    }

    public function buildSql(): GridPager
    {
        $selectSql = $this->createSelectSql();
        $fromSql = $this->createFromSql();
        $whereSql = $this->whereSql();
        $groupBySql = $this->groupBySql();
        $orderBySql = $this->orderBySql();
        $limitSql = $this->createLimitSql();

        $this->sql = $selectSql . $fromSql . $whereSql . $groupBySql . $orderBySql . $limitSql;

        return $this;
    }

    public function execute(): GridPager
    {
        $this->data = DB::select($this->sql);
        $this->setRowCount();
        return $this;
    }

    public function getPagedData(): array
    {
        $pageSize = $this->params['endRow'] - $this->params['startRow'];

        if ($this->data && (sizeof($this->data) > $pageSize)) {
            return array_splice($this->data, 0, $pageSize);
        } else {
            return $this->data;
        }
    }

    private function setRowCount(): void
    {
        if (is_null($this->data) || !isset($this->data) || sizeof($this->data) == 0) {
            $this->rowCount = 0;
        }

        $currentLastRow = $this->params['startRow'] + sizeof($this->data);

        if ($currentLastRow <= $this->params['endRow']) {
            $this->rowCount = $currentLastRow;
        } else {
            $this->rowCount = -1;
        }
    }

    private function createSelectSql(): string
    {
        $rowGroupCols = $this->params['rowGroupCols'];
        $valueCols = $this->params['valueCols'];
        $groupKeys = $this->params['groupKeys'];

        if ($this->isDoingGrouping($rowGroupCols, $groupKeys)) {
            $colsToSelect = [];

            $rowGroupCol = $rowGroupCols[sizeof($groupKeys)];
            array_push($colsToSelect, $rowGroupCol['field']);

            foreach ($valueCols as $key => $value) {
                array_push($colsToSelect, $value['aggFunc'] . '(' . $value['field'] . ') as ' . $value['field']);
            }

            return "SELECT " . join(", ", $colsToSelect);
        }

        return "SELECT * ";
    }

    private function createFromSql(): string
    {
        return "FROM $this->table ";
    }

    private function whereSql(): string
    {
        $rowGroupCols = $this->params['rowGroupCols'];
        $groupKeys = $this->params['groupKeys'];
        $filterModel = $this->params['filterModel'];

        $whereParts = [];

        if (sizeof($groupKeys) > 0) {
            foreach ($groupKeys as $key => $value) {
                $colName = $rowGroupCols[$key]['field'];
                array_push($whereParts, "{$colName} = '{$value}'");
            }
        }

        if ($filterModel) {
            foreach ($filterModel as $key => $value) {
                if ($value['filterType'] == 'set') {
                    array_push($whereParts, $key . ' IN ("'  . join('", "', $value['values']) . '")');
                }
            }
        }

        if (sizeof($whereParts) > 0) {
            return " WHERE " . join(' and ', $whereParts);
        } else {
            return "";
        }
    }

    private function groupBySql(): string
    {
        $rowGroupCols = $this->params['rowGroupCols'];
        $groupKeys = $this->params['groupKeys'];

        if ($this->isDoingGrouping($rowGroupCols, $groupKeys)) {
            $colsToGroupBy = [];

            $rowGroupCol = $rowGroupCols[sizeof($groupKeys)];
            array_push($colsToGroupBy, $rowGroupCol['field']);

            return " GROUP BY " . join(", ", $colsToGroupBy);
        } else {
            return "";
        }
    }

    private function orderBySql(): string
    {
        $sortModel = $this->params['sortModel'];

        if ($sortModel) {
            $sortParts = [];

            foreach ($sortModel as $key => $value) {
                array_push($sortParts, $value['colId'] . " " . $value['sort']);
            }

            array_push($sortParts, 'id ASC');

            if (sizeof($sortParts) > 0) {
                return " ORDER BY " . join(", ", $sortParts);
            } else {
                return '';
            }
        } else {
            return 'id';
        }
    }

    private function createLimitSql(): string
    {
        $startRow = $this->params['startRow'];
        $endRow = $this->params['endRow'];
        $pageSize = ($endRow - $startRow) + 1;

        return " LIMIT {$pageSize} OFFSET {$startRow};";
    }

    private function isDoingGrouping($rowGroupCols, $groupKeys): bool
    {
        return sizeof($rowGroupCols) > sizeof($groupKeys);
    }
}
