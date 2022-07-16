<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\JobType;
use App\Http\Requests\StoreJobTypeRequest;
use App\Http\Requests\UpdateJobTypeRequest;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class JobTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return response()->json(JobType::all(), 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     */
    public function indexGrid(Request $request)
    {
        $sql = $this->buildSql($request);
        $results = DB::select($sql);
        $rowCount = $this->getRowCount($request, $results);
        $resultsForPage = $this->cutResultsToPageSize($request, $results);

        return ['rows' => $resultsForPage, 'lastRow' => $rowCount];
    }

    /**
     * Return unique values for filtering
     *
     * @param Request $request
     * @param string $field
     */
    public function indexGridFilter(Request $request, string $field)
    {
        return JobType::select($field)->distinct()->orderBy($field, 'asc')->pluck($field);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreJobTypeRequest $request
     * @return Response
     */
    public function store(StoreJobTypeRequest $request)
    {
        $jobType = JobType::create([
            'slug' => $request->slug,
            'name' => $request->name,
        ]);
        return response($jobType, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param JobType $jobType
     * @return Response
     */
    public function show(JobType $jobType)
    {
        return response()->json($jobType, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param JobType $jobType
     * @return Response
     */
    public function edit(JobType $jobType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateJobTypeRequest $request
     * @param JobType $jobType
     * @return Response
     */
    public function update(UpdateJobTypeRequest $request, JobType $jobType)
    {
        if(!$jobType) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $jobType->update([
            'name' => $request->name,
        ]);
        return response()->json($jobType, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param JobType $jobType
     * @return Response
     */
    public function destroy(JobType $jobType)
    {
        if(!$jobType) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $record = strtoupper($jobType->name);

        try {
            $jobType->delete();
        } catch(QueryException $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'code' => $e->getCode(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTrace(),
                'message' => $e->getMessage(),
                'sql' => $e->getSql(),
                'bindings' => $e->getBindings(),
                'record' => $record,
            ], 500);
        }

        return response()->json(['message' => 'Record `' . $record . '` was deleted successfully'], 200);
    }






    public function buildSql(Request $request)
    {
        $selectSql = $this->createSelectSql($request);
        $fromSql = " FROM job_types ";
        $whereSql = $this->whereSql($request);
        $groupBySql = $this->groupBySql($request);
        $orderBySql = $this->orderBySql($request);
        $limitSql = $this->createLimitSql($request);

        $SQL = $selectSql . $fromSql . $whereSql . $groupBySql . $orderBySql . $limitSql;
        return $SQL;
    }

    public function createSelectSql(Request $request)
    {
        $rowGroupCols = $request->input('rowGroupCols');
        $valueCols = $request->input('valueCols');
        $groupKeys = $request->input('groupKeys');

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

    public function whereSql(Request $request)
    {
        $rowGroupCols = $request->input('rowGroupCols');
        $groupKeys = $request->input('groupKeys');
        $filterModel = $request->input('filterModel');

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

    public function groupBySql(Request $request)
    {
        $rowGroupCols = $request->input('rowGroupCols');
        $groupKeys = $request->input('groupKeys');

        if ($this->isDoingGrouping($rowGroupCols, $groupKeys)) {
            $colsToGroupBy = [];

            $rowGroupCol = $rowGroupCols[sizeof($groupKeys)];
            array_push($colsToGroupBy, $rowGroupCol['field']);

            return " GROUP BY " . join(", ", $colsToGroupBy);
        } else {
            // select all columns
            return "";
        }
    }

    public function orderBySql(Request $request)
    {
        $sortModel = $request->input('sortModel');

        if ($sortModel) {
            $sortParts = [];

            foreach ($sortModel as $key => $value) {
                array_push($sortParts, $value['colId'] . " " . $value['sort']);
            }

            if (sizeof($sortParts) > 0) {
                return " ORDER BY " . join(", ", $sortParts);
            } else {
                return '';
            }
        }
    }

    public function isDoingGrouping($rowGroupCols, $groupKeys)
    {
        // We are not doing grouping if at the lowest level. We are at the lowest level
        // if we are grouping by more columns than we have keys for (that means the user
        // has not expanded a lowest level group, OR we are not grouping at all).

        return sizeof($rowGroupCols) > sizeof($groupKeys);
    }

    public function createLimitSql(Request $request)
    {
        $startRow = $request->input('startRow');
        $endRow = $request->input('endRow');
        $pageSize = ($endRow - $startRow) + 1;

        return " LIMIT {$pageSize} OFFSET {$startRow};";
    }

    public function getRowCount(Request $request, $results)
    {
        if (is_null($results) || !isset($results) || sizeof($results) == 0) {
            return 0;
        }

        $currentLastRow = $request['startRow'] + sizeof($results);

        if ($currentLastRow <= $request['endRow']) {
            return $currentLastRow;
        } else {
            return -1;
        }
    }

    public function cutResultsToPageSize($request, $results)
    {
        $pageSize = $request['endRow'] - $request['startRow'];

        if ($results && (sizeof($results) > $pageSize)) {
            return array_splice($results, 0, $pageSize);
        } else {
            return $results;
        }
    }

}
