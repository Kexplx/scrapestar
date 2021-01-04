import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExecutionTime } from '../models/execution-time';
import { Job } from '../models/job';
import { Selector } from '../models/selector';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss'],
})
export class JobFormComponent implements OnInit {
  @Input() job: Job | undefined;

  @Output() submitted = new EventEmitter<Job>();
  @Output() cancelled = new EventEmitter<Job>();

  name = '';
  url = '';
  description = '';

  selectorName = '';
  cssSelector = '';

  dayOfWeek = 1;
  hour = 8;
  minute = 0;

  selectors: Selector[] = [];
  executionTimes: ExecutionTime[] = [];

  ngOnInit() {
    if (this.job) {
      const { name, url, executionTimes, selectors } = this.job;

      this.name = name;
      this.url = url;
      this.selectors = selectors;
      this.executionTimes = executionTimes;
    }
  }

  onAddSelector() {
    // Validate `selectorName` and `cssSelector`

    const name = this.selectorName;
    const cssSelector = this.cssSelector;

    this.selectors.push({ name, cssSelector });

    this.selectorName = '';
    this.cssSelector = '';
  }

  onRemoveSelector(selector: Selector) {
    const indexOf = this.selectors.indexOf(selector);

    if (indexOf != -1) {
      this.selectors.splice(indexOf, 1);
    }
  }

  onSubmit() {
    const job: Job = {
      ...this.job,
      name: this.name,
      url: this.url,
      selectors: this.selectors,
      executionTimes: this.executionTimes,
    };

    this.submitted.emit(job);
  }

  onCancel() {
    this.cancelled.emit();
  }
}
