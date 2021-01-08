import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  tabIndex = 0;

  onEdit() {
    this.editClicked.emit();
  }

  onDelete() {
    this.deleteClicked.emit();
  }
}
