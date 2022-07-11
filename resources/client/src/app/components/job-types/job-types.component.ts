import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { JobType } from './job-type';
import { JobTypeService } from './job-type.service';
import { ActionButtonComponent, ButtonParams } from '../button/action-button.component';

@Component({
    selector: 'app-job-types',
    templateUrl: './job-types.component.html',
    styleUrls: ['./job-types.component.css'],
})
export class JobTypesComponent implements OnInit {
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

    constructor(
        private jobTypeService: JobTypeService,
    ) { }

    public ngOnInit(): void {
        this.getJobTypes();
    }

    public getJobTypes() {
        this.jobTypeService.getJobTypes().subscribe(res => {
            this.jobTypes = res;
        });
    }

    public deleteRecord(id: number) {
        this.jobTypeService.deleteJobType(id).subscribe(res => {
            this.getJobTypes();
        });
    }
}
