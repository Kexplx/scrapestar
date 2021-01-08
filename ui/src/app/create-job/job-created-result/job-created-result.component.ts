import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-job-created-result',
  templateUrl: './job-created-result.component.html',
})
export class JobCreatedResultComponent implements OnInit {
  job: Job | undefined;

  constructor(private router: Router, private title: Title) {}

  ngOnInit() {
    if ('_id' in history.state) {
      this.title.setTitle('Success / Scrapestar');
      this.job = history.state;
    } else {
      this.router.navigateByUrl('not-found');
    }
  }
}
