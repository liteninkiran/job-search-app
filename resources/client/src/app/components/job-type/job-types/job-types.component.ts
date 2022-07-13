import { Component, ComponentRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { JobType } from './job-type';
import { JobTypeService } from './job-type.service';
import { ActionButtonComponent, ButtonParams } from '../../button/action-button.component';
import { Subscription } from 'rxjs';
import { ColDef, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { isSameMonth } from 'date-fns';

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
        hide: true,
      };
    public columnDefs = [
        { headerName: 'ID', field: 'id', flex: 1 },
        { headerName: 'Slug', field: 'slug' },
        { headerName: 'Name', field: 'name', hide: false },
        {
            headerName: 'Actions',
            field: 'id',
            flex: 2,
            hide: false,
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
    public calendarVisible = false;
    private buttonTextShow = 'Show Calendar';
    private buttonTextHide = 'Hide Calendar';
    public buttonText = this.buttonTextShow;

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

    public onValueChange(value: Date): void {
        console.log(`Current value: ${value}`);
    }

    public onPanelChange(change: { date: Date; mode: string }): void {
        console.log(`Current value: ${change.date}`);
        console.log(`Current mode: ${change.mode}`);
    }


    public date = new Date(2022, 7, 13);

    public onChange(date: Date): void {
      console.log(date);
    }
  
    public isSameMonth(current: Date): boolean {
      return isSameMonth(current, this.date);
    }

    public toggleCalendar() {
        this.calendarVisible = !this.calendarVisible;
        this.buttonText = this.calendarVisible ? this.buttonTextHide : this.buttonTextShow;
    }
}
