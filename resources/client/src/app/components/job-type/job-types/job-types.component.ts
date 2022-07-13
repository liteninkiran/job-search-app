import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { JobType } from './job-type';
import { JobTypeService } from './job-type.service';
import { ActionButtonComponent, ButtonParams } from '../../button/action-button.component';
import { Subscription } from 'rxjs';
import { ColDef, SideBarDef } from 'ag-grid-community';
import { HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { JobTypeEditDrawerComponent } from '../job-type-edit-drawer/job-type-edit-drawer.component';

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
    public drawerRef!: NzDrawerRef;

    constructor(
        private jobTypeService: JobTypeService,
        private notification: NzNotificationService,
        private drawerService: NzDrawerService,
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
        this.subDelete = this.jobTypeService.deleteJobType(id).subscribe({
            next: (data) => this.getJobTypes(),
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

    public open(): void {
        this.drawerRef = this.drawerService.create({
            nzTitle: 'Template',
            nzFooter: 'Footer',
            nzExtra: 'Extra',
            nzContent: JobTypeEditDrawerComponent,
            nzContentParams: { }
        });

        this.drawerRef.afterOpen.subscribe(() => {
            console.log('Drawer(Template) open');
        });
      
        this.drawerRef.afterClose.subscribe(() => {
            console.log('Drawer(Template) close');
        });
    }
}
