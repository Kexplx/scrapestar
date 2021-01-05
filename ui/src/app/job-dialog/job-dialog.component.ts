import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExecutionTime } from '../models/execution-time';
import { Job } from '../models/job';
import { Selector } from '../models/selector';

@Component({
  selector: 'app-edit-job-dialog',
  templateUrl: './job-dialog.component.html',
  styleUrls: ['./job-dialog.component.scss'],
})
export class JobDialogComponent {
  isCreateDialog = true;

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

  constructor(
    @Inject(MAT_DIALOG_DATA) private job: Job | undefined,
    private dialogRef: MatDialogRef<JobDialogComponent>,
  ) {
    this.isCreateDialog = job === undefined;
  }

  ngOnInit() {
    if (this.job) {
      const { name, url, executionTimes, selectors } = this.job;

      this.name = name;
      this.url = url;
      this.selectors = [...selectors];
      this.executionTimes = [...executionTimes];
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

    this.dialogRef.close(job);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
