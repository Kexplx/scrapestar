import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  @Input() isLoading = false;
  @Output() submitted = new EventEmitter<Job>();
  @Output() cancelled = new EventEmitter();

  metainformationGroup = this.fb.group({
    name: [null, Validators.required],
    url: [null, Validators.required],
  });

  selectorGroup = this.fb.group({
    name: [null, Validators.required],
    cssSelector: [null, Validators.required],
  });

  executionTimeGroup = this.fb.group({
    dayOfWeek: 1,
    hour: [8, [Validators.min(0), Validators.max(24)]],
    minute: [0, [Validators.min(0), Validators.max(59)]],
  });

  selectors: Selector[] = [];
  executionTimes: ExecutionTime[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.job) {
      const { name, url, executionTimes, selectors } = this.job;

      this.metainformationGroup.setValue({ name, url });

      this.selectors = [...selectors];
      this.executionTimes = [...executionTimes];
    }
  }

  onAddSelector() {
    const name = this.selectorGroup.controls.name.value;
    const cssSelector = this.selectorGroup.controls.cssSelector.value;

    this.selectors.push({ name, cssSelector });

    this.selectorGroup.reset();
  }

  onDeleteSelector(selector: Selector) {
    const indexOf = this.selectors.indexOf(selector);

    if (indexOf != -1) {
      this.selectors.splice(indexOf, 1);
    }
  }

  onAddExecutionTime() {
    const dayOfWeek = this.executionTimeGroup.controls.dayOfWeek.value;
    const hour = this.executionTimeGroup.controls.hour.value;
    const minute = this.executionTimeGroup.controls.minute.value;

    this.executionTimes.push({ dayOfWeek, hour, minute });

    this.executionTimeGroup.setValue({ dayOfWeek: dayOfWeek + (1 % 7), hour: 8, minute: 0 });
  }

  onDeleteExecutionTime(et: ExecutionTime) {
    const indexOf = this.executionTimes.indexOf(et);

    if (indexOf != -1) {
      this.executionTimes.splice(indexOf, 1);
    }
  }

  onSubmit() {
    const job: Job = {
      ...this.job,
      name: this.metainformationGroup.controls.name.value,
      url: this.metainformationGroup.controls.url.value,
      selectors: this.selectors,
      executionTimes: this.executionTimes,
    };

    this.submitted.emit(job);
  }

  onCancel() {
    this.cancelled.emit();
  }

  onCheckMetaInformationValidity() {
    for (const i in this.metainformationGroup.controls) {
      this.metainformationGroup.controls[i].markAsDirty();
      this.metainformationGroup.controls[i].updateValueAndValidity();
    }
  }

  onCheckSelectorFormValidity() {
    for (const i in this.selectorGroup.controls) {
      this.selectorGroup.controls[i].markAsDirty();
      this.selectorGroup.controls[i].updateValueAndValidity();
    }
  }
}
