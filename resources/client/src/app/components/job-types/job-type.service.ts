import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobType } from './job-type';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JobTypeService {

    constructor(private httpClient: HttpClient) { }
 
    public getJobTypes(): Observable<JobType[]> {
        return this.httpClient.get<JobType[]>('http://127.0.0.1:8000/api/job_type');
    }

    public addJobType(jobType: JobType): Observable<JobType> {
        return this.httpClient.post<JobType>('http://127.0.0.1:8000/api/job_type', jobType);
    }

    public deleteJobType(id: number): Observable<any> {
        return this.httpClient.delete(`http://127.0.0.1:8000/api/job_type/${id}`);
    }

    public getJobTypeById(id: number): Observable<JobType> {
        return this.httpClient.get<JobType>(`http://127.0.0.1:8000/api/job_type/${id}`);
    }

    public updateJobType(id: number, jobType: JobType): Observable<JobType> {
        return this.httpClient.put<JobType>(`http://127.0.0.1:8000/api/job_type/${id}`, jobType);
    }
}
