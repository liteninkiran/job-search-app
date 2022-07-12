import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobType } from '../job-types/job-type';
import { JobTypeService } from '../job-types/job-type.service';

@Component({
    selector: 'app-job-type-edit',
    templateUrl: './job-type-edit.component.html',
    styleUrls: ['./job-type-edit.component.css'],
})
export class JobTypeEditComponent implements OnInit, OnDestroy {

    public id: number = 0;
    public data: any;
    public jobType = new JobType();
    public errors: any;
    public subGet: Subscription = new Subscription;
    public subUpdate: Subscription = new Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private jobTypeService: JobTypeService,
        private zone: NgZone,
    ) { }

    public ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.getData(this.id);
    }

    public ngOnDestroy(): void {
        this.subGet.unsubscribe();
        this.subUpdate.unsubscribe();
    }

    public getData(id: number) {
        this.subGet = this.jobTypeService.getJobTypeById(id).subscribe({
            next: (data) => this.jobType = data,
            error: (error: HttpErrorResponse) => console.error(error),
            complete: () => console.info('complete') 
        });
    }

    public updateJobType() {
        this.subUpdate = this.jobTypeService.updateJobType(this.id, this.jobType).subscribe({
            next: (data) => this.zone.run(() => this.router.navigateByUrl('/job_types')),
            error: (error: HttpErrorResponse) => this.errors = error.error.errors,
            complete: () => console.info('complete') 
        });
    }
}
