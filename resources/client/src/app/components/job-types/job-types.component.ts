import { Component, OnInit } from '@angular/core';
import { ButtonParams, EditButtonComponent } from '../button/edit-button/edit-button.component';
import { JobType } from './job-type';
import { JobTypeService } from './job-type.service';

@Component({
    selector: 'app-job-types',
    templateUrl: './job-types.component.html',
    styleUrls: ['./job-types.component.css'],
})
export class JobTypesComponent implements OnInit {

    public jobTypes: any;
    public jobType = new JobType();
    public columnDefs = [
        { headerName: 'ID', field: 'id', sortable: true, resizable: true, filter: true },
        { headerName: 'Slug', field: 'slug', sortable: true, resizable: true, filter: true },
        { headerName: 'Name', field: 'name', sortable: true, resizable: true, filter: true },
        {
            headerName: 'Action',
            field: 'id',
            cellRenderer: EditButtonComponent,
            cellRendererParams: {
                buttonText: 'Edit'
            } as ButtonParams
        },
    ];

    constructor(private jobTypeService: JobTypeService) { }

    ngOnInit(): void {
        this.getJobTypes();
    }

    public getJobTypes() {
        this.jobTypeService.getJobTypes().subscribe(res => {
            this.jobTypes = res;
        });
    }

    public deleteJobType(id: number) {
        this.jobTypeService.deleteJobType(id).subscribe(res => {
            this.getJobTypes();
        });
    }
}
