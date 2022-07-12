import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { JobType } from './job-type';
import { JobTypeService } from './job-type.service';
import { ActionButtonComponent, ButtonParams } from '../button/action-button.component';
import { Subscription } from 'rxjs';
import { ColDef, GridReadyEvent, SideBarDef } from 'ag-grid-community';

@Component({
    selector: 'app-job-types',
    templateUrl: './job-types.component.html',
    styleUrls: ['./job-types.component.css'],
})
export class JobTypesComponent implements OnInit, OnDestroy {

    @ViewChild('grid', { static: false }) agGrid!: AgGridAngular;

    public jobTypes: any;
    public jobType = new JobType();
    public defaultColDef: ColDef = {
        flex: 5,
        minWidth: 100,
        filter: true,
        sortable: true,
        resizable: true,
      };
    public columnDefs = [
        { headerName: 'ID', field: 'id', flex: 1 },
        { headerName: 'Slug', field: 'slug', hidden: true },
        { headerName: 'Name', field: 'name' },
        {
            headerName: 'Actions',
            field: 'id',
            flex: 3,
            cellRenderer: ActionButtonComponent,
            cellRendererParams: {
                editUrl: 'job_types/edit/',
                parent: this,
            } as ButtonParams
        },
    ];
    public sideBar: SideBarDef;
    public subGet: Subscription = new Subscription;
    public subDelete: Subscription = new Subscription;

    constructor(
        private jobTypeService: JobTypeService,
    ) {
        this.sideBar = {
            toolPanels: [
                {
                    id: 'columns',
                    labelDefault: 'Columns',
                    labelKey: 'columns',
                    iconKey: 'columns',
                    toolPanel: 'agColumnsToolPanel',
                    minWidth: 225,
                    maxWidth: 225,
                    width: 225,
                },
                {
                    id: 'filters',
                    labelDefault: 'Filters',
                    labelKey: 'filters',
                    iconKey: 'filter',
                    toolPanel: 'agFiltersToolPanel',
                    minWidth: 180,
                    maxWidth: 400,
                    width: 250,
                }
            ],
            position: 'right',
        };

    }

    public ngOnInit(): void {
        this.getJobTypes();
    }

    public ngOnDestroy(): void {
        this.subGet.unsubscribe();
        this.subDelete.unsubscribe();
    }

    public getJobTypes() {
        this.subGet = this.jobTypeService.getJobTypes().subscribe(res => {
            this.jobTypes = res;
        });
    }

    public deleteRecord(id: number) {
        this.subDelete = this.jobTypeService.deleteJobType(id).subscribe(res => {
            this.getJobTypes();
        });
    }
}
