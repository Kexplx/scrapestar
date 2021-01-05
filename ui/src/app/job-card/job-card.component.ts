import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Job } from '../models/job';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent {
  @Output() editClicked = new EventEmitter();
  @Output() deleteClicked = new EventEmitter();

  @Input() job!: Job;

  onEdit() {
    this.editClicked.emit();
  }

  onDelete() {
    this.deleteClicked.emit();
  }
}
