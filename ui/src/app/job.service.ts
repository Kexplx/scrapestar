import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from './models/job';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private readonly baseUrl = 'http://localhost:3000/jobs';
  constructor(private http: HttpClient) {}

  postJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.baseUrl, job);
  }

  get(id: string) {
    const url = this.baseUrl + '/' + id;

    return this.http.get<Job>(url);
  }

  loadJobs() {
    const url = this.baseUrl;

    return this.http.get<Job[]>(url);
  }

  updateJob(job: Job) {
    const url = this.baseUrl + '/' + job._id;

    return this.http.put(url, job);
  }

  delete(job: Job) {
    const url = this.baseUrl + '/' + job._id;

    return this.http.delete(url);
  }
}
