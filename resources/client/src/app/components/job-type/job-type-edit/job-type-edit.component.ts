import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
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
    public jobType!: JobType;
    public data: any;
    public errors: any;
    public subGet: Subscription = new Subscription;
    public subUpdate: Subscription = new Subscription;
    public form!: FormGroup;

    constructor(
        private jobTypeService: JobTypeService,
        private drawerRef: NzDrawerRef<string>,
        private fb: FormBuilder,
    ) { }

    public ngOnInit(): void {
        this.buildForm();
        if(this.id !== 0) {
            this.getData(this.id);
        }
    }

    public ngOnDestroy(): void {
        this.subGet.unsubscribe();
        this.subUpdate.unsubscribe();
    }

    public getData(id: number) {
        this.subGet = this.jobTypeService.getJobTypeById(id).subscribe({
            next: (data: JobType) => {
                this.editJobType(data);
                this.jobType = data;
            },
            error: (error: HttpErrorResponse) => console.error(error),
        });
    }

    public editJobType(jobType: JobType) {
        this.form.patchValue({
            name: jobType.name,
        });
    }

    public buildForm() {
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required]),
        });
    }

    public submitForm() {
        this.mapFormValuesToObject();
        this.subUpdate = this.jobTypeService.updateJobType(this.id, this.jobType).subscribe({
            next: (data) => this.drawerRef.close(),
            error: (error: HttpErrorResponse) => this.errors = error.error.errors,
        });
    }

    public mapFormValuesToObject() {
        this.jobType.name = this.form.value.name;
    }
}
