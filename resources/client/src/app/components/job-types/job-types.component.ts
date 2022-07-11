import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { JobType } from './job-type';
import { JobTypeService } from './job-type.service';
import { ActionButtonComponent, ButtonParams } from '../button/action-button.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-job-types',
    templateUrl: './job-types.component.html',
    styleUrls: ['./job-types.component.css'],
})
export class JobTypesComponent implements OnInit, OnDestroy {

    @ViewChild('grid', { static: false }) agGrid!: AgGridAngular;

    public jobTypes: any;
    public jobType = new JobType();
    public columnDefs = [
        { headerName: 'ID'  , field: 'id'  , sortable: true, resizable: true, filter: true },
        { headerName: 'Slug', field: 'slug', sortable: true, resizable: true, filter: true },
        { headerName: 'Name', field: 'name', sortable: true, resizable: true, filter: true },
        {
            headerName: 'Actions',
            field: 'id',
            resizable: true,
            cellRenderer: ActionButtonComponent,
            cellRendererParams: {
                editUrl: 'job_types/edit/',
                parent: this,
            } as ButtonParams
        },
    ];

    public subGet: Subscription = new Subscription;
    public subDelete: Subscription = new Subscription;

    constructor(
        private jobTypeService: JobTypeService,
    ) { }

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
