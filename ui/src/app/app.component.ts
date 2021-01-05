import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { delay, filter, switchMap, tap } from 'rxjs/operators';
import { JobDialogComponent } from './job-dialog/job-dialog.component';
import { JobService } from './job.service';
import { Job } from './models/job';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  jobs$ = this.jobService.loadJobs();
  isLoading = true;

  constructor(private jobService: JobService, private dialogService: MatDialog) {}

  onCreate() {
    const dialogRef = this.dialogService.open(JobDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(
        filter(job => job),
        switchMap(job => this.jobService.postJob(job)),
      )
      .subscribe(() => (this.jobs$ = this.jobService.loadJobs()));
  }

  onEdit(job: Job) {
    const dialogRef = this.dialogService.open(JobDialogComponent, { data: job });

    dialogRef
      .afterClosed()
      .pipe(
        filter(job => job),
        switchMap(job => this.jobService.updateJob(job)),
      )
      .subscribe(() => (this.jobs$ = this.jobService.loadJobs()));
  }

  onReload() {
    this.jobs$ = this.jobService.loadJobs();
  }

  onDelete(job: Job) {
    this.jobs$ = this.jobService.delete(job).pipe(switchMap(() => this.jobService.loadJobs()));
  }
}
