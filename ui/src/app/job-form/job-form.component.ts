import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ExecutionTime } from '../models/execution-time';
import { Job } from '../models/job';
import { Selector } from '../models/selector';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss'],
})
export class JobFormComponent implements OnInit {
  @Input() job: Job | undefined;
  @Output() submitted = new EventEmitter<Job>();
  @Output() cancelled = new EventEmitter();

  name = '';
  url = '';
  description = '';

  selectorName = '';
  cssSelector = '';

  dayOfWeek = 1; // Monday
  hourControl = new FormControl(8, [Validators.min(0), Validators.max(24)]);
  minuteControl = new FormControl(0, [Validators.min(0), Validators.max(59)]);

  selectors: Selector[] = [];
  executionTimes: ExecutionTime[] = [];

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
    const name = this.selectorName.replace(/\s/g, ''); // Remove all whitespaces.
    const cssSelector = this.cssSelector;

    this.selectors.push({ name, cssSelector });

    // Reset fields
    this.selectorName = '';
    this.cssSelector = '';
  }

  onRemoveSelector(selector: Selector) {
    const indexOf = this.selectors.indexOf(selector);

    if (indexOf != -1) {
      this.selectors.splice(indexOf, 1);
    }
  }

  onAddExecutionTime() {
    const dayOfWeek = this.dayOfWeek;
    const hour = this.hourControl.value;
    const minute = this.minuteControl.value;

    this.executionTimes.push({ dayOfWeek, hour, minute });

    // Reset fields
    this.dayOfWeek = (dayOfWeek + 1) % 7; // Saturday -> Sunday, Sunday -> Monday
    this.hourControl.setValue(8);
    this.minuteControl.setValue(0);
  }

  onRemoveExecutionTime(et: ExecutionTime) {
    const indexOf = this.executionTimes.indexOf(et);

    if (indexOf != -1) {
      this.executionTimes.splice(indexOf, 1);
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

    this.submitted.emit(job);
  }

  onCancel() {
    this.cancelled.emit();
  }
}
