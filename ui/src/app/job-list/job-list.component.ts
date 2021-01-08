import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { JobService } from '../job.service';
import { Job } from '../models/job';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit {
  jobs$ = this.jobService.loadJobs();
  isLoading = false;

  constructor(private jobService: JobService, private router: Router, private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Jobs / Scrapestar');
  }

  onReload() {
    this.isLoading = true;
    this.jobs$ = this.jobService.loadJobs().pipe(tap(() => (this.isLoading = false)));
  }

  onEdit(job: Job) {
    const url = `jobs/${job._id}/edit`;

    this.router.navigate([url]);
  }

  onDelete(job: Job) {
    this.jobs$ = this.jobService.delete(job).pipe(switchMap(() => this.jobService.loadJobs()));
  }
}
