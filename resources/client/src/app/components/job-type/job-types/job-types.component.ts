import { 
    ColDef,
    GridApi,
    SideBarDef,
    ServerSideStoreType,
    IServerSideDatasource,
    IServerSideGetRowsParams,
    IServerSideGetRowsRequest
} from 'ag-grid-community';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActionButtonComponent, ButtonParams } from '../../button/action-button.component';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { JobTypeCreateComponent } from '../job-type-create/job-type-create.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { JobTypeEditComponent } from '../job-type-edit/job-type-edit.component';
import { HttpErrorResponse } from '@angular/common/http';
import { JobTypeService } from './job-type.service';
import { AgGridAngular } from 'ag-grid-angular';
import { Subscription } from 'rxjs';
import { JobType } from './job-type';

@Component({
    selector: 'app-job-types',
    templateUrl: './job-types.component.html',
    styleUrls: ['./job-types.component.css'],
})
export class JobTypesComponent implements OnInit, OnDestroy {

    public subJobTypes: Subscription = new Subscription;
    public subDelete: Subscription = new Subscription;
    public calendarVisible = false;
    public drawerRef!: NzDrawerRef;

    // Ag Grid
    public serverSideStoreType: ServerSideStoreType = 'partial';
    public rowModelType: AgGridAngular['rowModelType'] = 'serverSide';
    public columnDefs: AgGridAngular['columnDefs'];
    public paginationPageSize = 10;
    public defaultColDef: ColDef;
    public sideBar: SideBarDef;
    public rowData = [];
    private gridApi!: GridApi<JobType>;
    private gridColumnApi!: any;
    private datasource!: IServerSideDatasource;

    private applySort = true;

    constructor(
        private jobTypeService: JobTypeService,
        private notification: NzNotificationService,
        private drawerService: NzDrawerService,
    ) {
        this.defaultColDef = {
            flex: 5,
            minWidth: 100,
            filter: false,
            sortable: true,
            resizable: true,
            hide: true,
        };
        this.columnDefs = [
            {
                headerName: 'ID',
                field: 'id',
                flex: 1,
            },
            {
                headerName: 'Name',
                field: 'name',
                hide: false,
                filter: 'agSetColumnFilter',
                filterParams: {
                    values: (params: any) => {
                        this.jobTypeService
                            .getJobTypeFilter(params.colDef.field)
                            .subscribe(values => params.success(values));
                    }
                }
            },
            {
                headerName: 'Actions',
                field: 'id',
                flex: 2,
                hide: false,
                sortable: false,
                cellRenderer: ActionButtonComponent,
                cellRendererParams: {
                    editUrl: 'job_types/edit/',
                    parent: this,
                } as ButtonParams
            },
        ];
        this.sideBar = {
            toolPanels: [
                {
                    id: 'columns',
                    labelDefault: 'Columns',
                    labelKey: 'columns',
                    iconKey: 'columns',
                    toolPanel: 'agColumnsToolPanel',
                    toolPanelParams: {
                        suppressRowGroups: true,
                        suppressValues: true,
                        suppressPivots: true,
                        suppressPivotMode: true,
                      },
                    minWidth: 100,
                    maxWidth: 400,
                    width: 250,
                },
                {
                    id: 'filters',
                    labelDefault: 'Filters',
                    labelKey: 'filters',
                    iconKey: 'filter',
                    toolPanel: 'agFiltersToolPanel',
                    minWidth: 100,
                    maxWidth: 400,
                    width: 250,
                }
            ],
            position: 'right',
        };
    }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        this.subJobTypes.unsubscribe();
        this.subDelete.unsubscribe();
    }

    public deleteRecord(id: number) {
        this.subDelete = this.jobTypeService.deleteJobType(id).subscribe({
            next: (data) => this.gridApi.setServerSideDatasource(this.datasource),
            error: (error: HttpErrorResponse) => this.deleteError(error),
        });
    }

    public deleteError(error: HttpErrorResponse) {
        const message = '<p>Record could not be deleted:</p>' + 
                        '<p><strong>' + error.error.record + '</strong></p>' + 
                        '<p><em>' + error.error.message + '</em></p>';
        this.notification.blank('SQL Error', message, {
            nzDuration: 0,
        });
    }

    public open_edit_drawer(id: number): void {
        this.drawerRef = this.drawerService.create({
            nzContent: JobTypeEditComponent,
            nzContentParams: { 'id': id },
            nzWidth: 500,
        });

        this.drawerRef.afterOpen.subscribe(() => { });
      
        this.drawerRef.afterClose.subscribe((data: JobType) => {
            if(data) {
                this.gridApi.setServerSideDatasource(this.datasource); 
            }
        });
    }

    public open_create_drawer(): void {
        this.drawerRef = this.drawerService.create({
            nzContent: JobTypeCreateComponent,
            nzContentParams: { },
            nzWidth: 500,
        });

        this.drawerRef.afterOpen.subscribe(() => { });

        this.drawerRef.afterClose.subscribe((data: JobType) => {
            if(data) {
                this.gridApi.setServerSideDatasource(this.datasource); 
            }
        });
    }

    public onGridReady(params: any): void {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.datasource = {
            getRows: ((params: IServerSideGetRowsParams) => {
                const requestParams: IServerSideGetRowsRequest = params.request;
                const requestParamsJSON: string = JSON.stringify(requestParams);
                this.subJobTypes = this
                        .jobTypeService
                        .getJobTypesGrid(requestParamsJSON)
                        .subscribe((response) => params.success({
                            rowData: response.rows,
                            rowCount: response.lastRow,
                        }));
                this.sortByName();
            })
        };

        params.api.setServerSideDatasource(this.datasource);
    }

    public sortByName() {
        if(this.applySort) {
            this.gridColumnApi.applyColumnState({
                state: [{ colId: 'name', sort: 'asc' }],
                defaultState: { sort: null },
            });
            this.applySort = false;
        }
    }
}
