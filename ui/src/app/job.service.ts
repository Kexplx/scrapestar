import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from './models/job';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private readonly baseUrl = 'http://localhost:3000/jobs';

  constructor(private http: HttpClient) {}

  getAll() {
    const url = this.baseUrl;

    return this.http.get<Job[]>(url);
  }

  get(id: string) {
    const url = this.baseUrl + '/' + id;

    return this.http.get<Job>(url);
  }

  postJob(job: Job) {
    return this.http.post<Job>(this.baseUrl, job);
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
