import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { JobService } from '../job.service';
import { Job } from '../models/job';

@Component({
  selector: 'app-create-job-dialog',
  templateUrl: './create-job-dialog.component.html',
  styleUrls: ['./create-job-dialog.component.scss'],
})
export class CreateJobDialogComponent implements OnInit {
  constructor(
    private jobService: JobService,
    private dialogRef: MatDialogRef<CreateJobDialogComponent>,
  ) {}

  ngOnInit(): void {}

  onFormCancel() {
    this.dialogRef.close(false);
  }

  onFormSubmit(job: Job) {
    this.jobService.postJob(job).subscribe(() => {});
    this.dialogRef.close(true);
  }
}
