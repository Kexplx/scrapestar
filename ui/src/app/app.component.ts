import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateJobDialogComponent } from './create-job-dialog/create-job-dialog.component';
import { JobService } from './job.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  jobs$ = this.jobService.loadJobs();
  test = 1;

  constructor(private jobService: JobService, private dialogService: MatDialog) {
    const dialogRef = this.dialogService.open(CreateJobDialogComponent);
  }

  onCreateClick() {
    const dialogRef = this.dialogService.open(CreateJobDialogComponent);
  }
}
