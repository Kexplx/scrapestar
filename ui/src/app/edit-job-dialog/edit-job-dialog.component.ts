import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateJobDialogComponent } from '../create-job-dialog/create-job-dialog.component';
import { JobService } from '../job.service';
import { Job } from '../models/job';

@Component({
  selector: 'app-edit-job-dialog',
  templateUrl: './edit-job-dialog.component.html',
  styleUrls: ['./edit-job-dialog.component.scss'],
})
export class EditJobDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public job: Job,
    private dialogRef: MatDialogRef<EditJobDialogComponent>,
    private jobService: JobService,
  ) {}

  onFormCancel() {
    this.dialogRef.close(false);
  }

  onFormSubmit(job: Job) {
    this.jobService.updateJob(job).subscribe(() => {});
    this.dialogRef.close(true);
  }
}
