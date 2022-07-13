import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobType } from '../job-types/job-type';
import { JobTypeService } from '../job-types/job-type.service';

@Component({
    selector: 'app-job-type-create',
    templateUrl: './job-type-create.component.html',
    styleUrls: ['./job-type-create.component.css'],
})
export class JobTypeCreateComponent implements OnInit, OnDestroy {

    public jobType = new JobType();
    public errors: any;
    public subCreate: Subscription = new Subscription;

    constructor(
        private router: Router,
        private jobTypeService: JobTypeService,
    ) { }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        this.subCreate.unsubscribe();
    }

    public addJobType() {
        this.subCreate = this.jobTypeService.addJobType(this.jobType).subscribe({
            next: (data) => this.router.navigateByUrl('/job_types'),
            error: (error: HttpErrorResponse) => this.errors = error.error.errors,
            complete: () => {} // console.info('complete') 
        });
    }
}
