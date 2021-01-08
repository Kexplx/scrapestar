import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ExecutionTime } from '../models/execution-time';
import { Job } from '../models/job';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent implements OnInit {
  @Input() job!: Job;
  @Output() editClicked = new EventEmitter();
  @Output() deleteClicked = new EventEmitter();

  nextExecution: Date | undefined;
  tabIndex = 0;

  constructor(private message: NzMessageService) {}

  ngOnInit() {
    if (this.job.executionTimes.length) {
      this.nextExecution = this.nextExecutionDate(this.job.executionTimes);
    }
  }

  onCopyClipboard() {
    this.message.success('Endpoint copied to clipboard');
  }

  onEdit() {
    this.editClicked.emit();
  }

  onDelete() {
    this.deleteClicked.emit();
  }

  private nextExecutionDate(exectuionTimes: ExecutionTime[]): Date {
    const [nextExecutionTimeAsDate] = exectuionTimes
      .map(et => this.getDateFromExecutionTime(et))
      .sort((a, b) => a.getTime() - b.getTime())
      .filter(a => a.getTime() > Date.now());

    return nextExecutionTimeAsDate;
  }

  private getDateFromExecutionTime(executionTime: ExecutionTime): Date {
    const { dayOfWeek, minute, hour } = executionTime;
    const now = new Date();
    const then = new Date();

    let daysDiff;
    if (now.getDay() > dayOfWeek) {
      daysDiff = dayOfWeek + 7 - now.getDay();
    } else {
      daysDiff = dayOfWeek - now.getDay();
    }

    then.setDate(now.getDate() + daysDiff);
    then.setMinutes(minute);
    then.setHours(hour);

    return then;
  }
}
