import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { JobService } from '../job.service';
import { Job } from '../models/job';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss'],
})
export class EditJobComponent implements OnInit {
  isLoading = false;
  job$ = this.jobService.get(this.route.snapshot.params.id);

  constructor(
    private jobService: JobService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
  ) {}

  ngOnInit() {
    this.title.setTitle('Edit job / Scrapestar');
  }

  onSubmit(job: Job) {
    this.isLoading = true;
    this.jobService.updateJob(job).subscribe(() => {
      this.isLoading = false;
      this.message.success('Job was saved!');
    });
  }

  onCancel() {
    this.router.navigate(['/jobs']);
  }
}
