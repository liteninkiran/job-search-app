import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobType } from '../job-types/job-type';
import { JobTypeService } from '../job-types/job-type.service';

@Component({
    selector: 'app-job-type-edit',
    templateUrl: './job-type-edit.component.html',
    styleUrls: ['./job-type-edit.component.css'],
})
export class JobTypeEditComponent implements OnInit {

    public id: number = 0;
    public data: any;
    public jobType = new JobType();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private jobTypeService: JobTypeService,
        // private location: Location
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.getData(this.id);
    }

    public getData(id: number) {
        this.jobTypeService.getJobTypeById(id).subscribe(res => {
            this.data = res;
            this.jobType = this.data;
        });
    }

    public updateJobType() {
        this.jobTypeService.updateJobType(this.id, this.jobType).subscribe(res => {
            // this.location.back();
            this.router.navigateByUrl('/job_types');
        });
    }
}
