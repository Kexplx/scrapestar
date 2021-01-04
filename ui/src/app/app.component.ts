import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { interval, Observable, of } from 'rxjs';
import { filter, map, skip, switchMap } from 'rxjs/operators';
import { CreateJobDialogComponent } from './create-job-dialog/create-job-dialog.component';
import { EditJobDialogComponent } from './edit-job-dialog/edit-job-dialog.component';
import { JobService } from './job.service';
import { Job } from './models/job';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  jobs$ = this.jobService.loadJobs();

  constructor(private jobService: JobService, private dialogService: MatDialog) {}

  onCreate() {
    const dialogRef = this.dialogService.open(CreateJobDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(filter(dataChanged => dataChanged))
      .subscribe(() => (this.jobs$ = this.jobService.loadJobs()));
  }

  onEdit(job: Job) {
    const dialogRef = this.dialogService.open(EditJobDialogComponent, { data: job });

    dialogRef
      .afterClosed()
      .pipe(filter(dataChanged => dataChanged))
      .subscribe(() => (this.jobs$ = this.jobService.loadJobs()));
  }

  onReload() {
    this.jobs$ = this.jobService.loadJobs();
  }

  onDelete(job: Job) {
    this.jobs$ = this.jobService.delete(job).pipe(switchMap(() => this.jobService.loadJobs()));
  }
}
