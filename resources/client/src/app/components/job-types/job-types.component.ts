import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { JobType } from './job-type';
import { JobTypeService } from './job-type.service';
import { Router } from '@angular/router';

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
        { headerName: 'ID', field: 'id', sortable: true, resizable: true, filter: true, checkboxSelection: true, },
        { headerName: 'Slug', field: 'slug', sortable: true, resizable: true, filter: true },
        { headerName: 'Name', field: 'name', sortable: true, resizable: true, filter: true },
    ];

    constructor(
        private jobTypeService: JobTypeService,
        private router: Router,
    ) { }

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

    public getRow() {
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const id = selectedNodes[0].data.id;
        this.router.navigate([`/job_types/edit/${id}`]);
    }
}
