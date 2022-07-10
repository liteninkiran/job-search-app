import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobType } from '../job-types/job-type';
import { JobTypeService } from '../job-types/job-type.service';

@Component({
    selector: 'app-job-type-create',
    templateUrl: './job-type-create.component.html',
    styleUrls: ['./job-type-create.component.css'],
})
export class JobTypeCreateComponent implements OnInit {

    public jobType = new JobType();

    constructor(
        private router: Router,
        private jobTypeService: JobTypeService,
    ) { }

    ngOnInit(): void {
    }

    public addJobType() {
        this.jobTypeService.addJobType(this.jobType).subscribe(res => {
            this.router.navigateByUrl('/');
        });
    }
}
