import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ExecutionTime } from '../models/execution-time';
import { Job } from '../models/job';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent {
  @Input() job!: Job;
  @Output() editClicked = new EventEmitter();
  @Output() deleteClicked = new EventEmitter();

  nextExecution: Date | undefined;
  tabIndex = 0;

  constructor(private message: NzMessageService) {}

  onCopyClipboard() {
    this.message.success('Endpoint copied to clipboard');
  }

  onEdit() {
    this.editClicked.emit();
  }

  onDelete() {
    this.deleteClicked.emit();
  }
}
