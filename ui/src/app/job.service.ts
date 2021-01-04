import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from './models/job';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private readonly baseUrl = 'http://localhost:3000/jobs';
  constructor(private http: HttpClient) {}

  postJob(job: Job) {
    return this.http.post(this.baseUrl, job);
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
