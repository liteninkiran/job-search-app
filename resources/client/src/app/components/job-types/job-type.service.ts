import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobType } from './job-type';

@Injectable({
    providedIn: 'root'
})
export class JobTypeService {

    constructor(private httpClient: HttpClient) {

    }
 
    public getJobTypes() {
        return this.httpClient.get('http://127.0.0.1:8000/api/job_types');
    }

    public addJobType(jobType: JobType) {
        return this.httpClient.post('http://127.0.0.1:8000/api/job_types', jobType);
    }

    public deleteJobType(id: number) {
        return this.httpClient.delete(`http://127.0.0.1:8000/api/job_types/${id}`);
    }

    public getJobTypeById(id: number) {
        return this.httpClient.get(`http://127.0.0.1:8000/api/job_types/${id}`);
    }

    public updateJobType(id: number, jobType: JobType) {
        return this.httpClient.put(`http://127.0.0.1:8000/api/job_types/${id}`, jobType);
    }
}
