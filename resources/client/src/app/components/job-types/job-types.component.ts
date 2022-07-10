import { Component, OnInit } from '@angular/core';
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

    constructor(private jobTypeService: JobTypeService) { }

    ngOnInit(): void {
        this.getJobTypes();
    }

    public getJobTypes() {
        this.jobTypeService.getJobTypes().subscribe(res => {
            this.jobTypes = res;
        });
    }

    public addJobType() {
        this.jobTypeService.addJobType(this.jobType).subscribe(res => {
            this.getJobTypes();
        });
    }

    public deleteJobType(id: number) {
        this.jobTypeService.deleteJobType(id).subscribe(res => {
            this.getJobTypes();
        });
    }
}