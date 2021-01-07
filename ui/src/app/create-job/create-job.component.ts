import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { JobService } from '../job.service';
import { Job } from '../models/job';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
})
export class CreateJobComponent {
  isLoading = false;
  constructor(private jobService: JobService, private router: Router, private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Create job / ScrapeApp');
  }

  onSubmit(job: Job) {
    this.isLoading = true;
    this.jobService.postJob(job).subscribe(() => this.router.navigate(['/']));
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
