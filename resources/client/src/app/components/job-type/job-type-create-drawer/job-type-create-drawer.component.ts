import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Subscription } from 'rxjs';
import { JobType } from '../job-types/job-type';
import { JobTypeService } from '../job-types/job-type.service';

@Component({
    selector: 'app-job-type-create-drawer',
    templateUrl: './job-type-create-drawer.component.html',
    styleUrls: ['./job-type-create-drawer.component.css']
})
export class JobTypeCreateDrawerComponent implements OnInit {

    public jobType = new JobType();
    public errors: any;
    public subCreate: Subscription = new Subscription;
    public form!: FormGroup;

    constructor(
        private jobTypeService: JobTypeService,
        private drawerRef: NzDrawerRef<string>,
        private fb: FormBuilder,
    ) { }

    public ngOnInit(): void {
        this.buildForm();
    }

    public ngOnDestroy(): void {
        this.subCreate.unsubscribe();
    }

    public buildForm() {
        this.form = new FormGroup({
            slug: new FormControl(null, [Validators.required]),
            name: new FormControl(null, [Validators.required]),
        });
    }

    public submitForm() {
        this.mapFormValuesToObject();
        this.subCreate = this.jobTypeService.createJobType(this.jobType).subscribe({
            next: (data) => this.drawerRef.close(),
            error: (error: HttpErrorResponse) => this.errors = error.error.errors,
        });
    }

    public mapFormValuesToObject() {
        this.jobType.slug = this.form.value.slug;
        this.jobType.name = this.form.value.name;
    }
}
