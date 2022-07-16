import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Subscription } from 'rxjs';
import { JobType } from '../job-types/job-type';
import { JobTypeService } from '../job-types/job-type.service';

@Component({
    selector: 'app-job-type-edit-drawer',
    templateUrl: './job-type-edit-drawer.component.html',
    styleUrls: ['./job-type-edit-drawer.component.css'],
})
export class JobTypeEditDrawerComponent implements OnInit, OnDestroy {

    public id: number = 0;
    public data: any;
    public jobType!: JobType;
    public errors: any;
    public subGet: Subscription = new Subscription;
    public subUpdate: Subscription = new Subscription;
    public validateForm!: FormGroup;

    constructor(
        private jobTypeService: JobTypeService,
        private drawerRef: NzDrawerRef<string>,
        private fb: FormBuilder,
    ) { }

    public ngOnInit(): void {
        if(this.id !== 0) {
            this.getData(this.id);
        }
        this.formValidation();
    }

    public ngOnDestroy(): void {
        this.subGet.unsubscribe();
        this.subUpdate.unsubscribe();
    }

    public formValidation(): void {
        this.validateForm = this.fb.group({
            name: [null, [Validators.required]],
        });
    }

    public getData(id: number) {
        this.subGet = this.jobTypeService.getJobTypeById(id).subscribe({
            next: (data) => this.jobType = data,
            error: (error: HttpErrorResponse) => console.error(error),
            complete: () => {} // console.info('complete') 
        });
    }

    public submitForm() {
        this.subUpdate = this.jobTypeService.updateJobType(this.jobType.id, this.jobType).subscribe({
            next: (data) => this.drawerRef.close(),
            error: (error: HttpErrorResponse) => this.errors = error.error.errors,
            complete: () => {} // console.info('complete') 
        });
    }
}
