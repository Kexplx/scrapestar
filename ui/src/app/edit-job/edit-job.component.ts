import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../job.service';
import { Job } from '../models/job';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss'],
})
export class EditJobComponent implements OnInit {
  job$ = this.jobService.get(this.route.snapshot.params.id);

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
  ) {}

  ngOnInit() {
    this.title.setTitle('Edit job / ScrapeApp');
  }

  onSubmit(job: Job) {
    this.jobService.updateJob(job).subscribe(() => this.router.navigate(['/jobs']));
  }

  onCancel() {
    this.router.navigate(['/jobs']);
  }
}
