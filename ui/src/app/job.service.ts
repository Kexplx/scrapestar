import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from './models/job';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private readonly baseUrl = 'http://localhost:3000/jobs';
  constructor(private http: HttpClient) {}

  loadJobs() {
    const url = this.baseUrl;

    return this.http.get<Job[]>(url);
  }
}
