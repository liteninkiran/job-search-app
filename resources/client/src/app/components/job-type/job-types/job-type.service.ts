import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JobType } from './job-type';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JobTypeService {

    public httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    private apiUrl = 'http://127.0.0.1:8000/api/job_type';

    constructor(private httpClient: HttpClient) { }
 
    public getJobTypes(): Observable<JobType[]> {
        return this.httpClient.get<JobType[]>(this.apiUrl);
    }

    public createJobType(jobType: JobType): Observable<JobType> {
        return this.httpClient.post<JobType>(this.apiUrl, jobType);
    }

    public deleteJobType(id: number): Observable<any> {
        return this.httpClient.delete(`${this.apiUrl}/${id}`);
    }

    public getJobTypeById(id: number): Observable<JobType> {
        return this.httpClient.get<JobType>(`${this.apiUrl}/${id}`);
    }

    public updateJobType(id: number, jobType: JobType): Observable<JobType> {
        return this.httpClient.put<JobType>(`${this.apiUrl}/${id}`, jobType);
    }

    public getJobTypesGrid(header: string): Observable<any> {
        return this.httpClient.post(`${this.apiUrl}_grid`, header, this.httpOptions);
    }

    public getJobTypeFilter(field: string): Observable<any> {
        return this.httpClient.get(`${this.apiUrl}_grid/${field}`, this.httpOptions);
    }
}
