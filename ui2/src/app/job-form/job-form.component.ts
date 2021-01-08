import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  onRemoveSelector(selector: Selector) {
    const indexOf = this.selectors.indexOf(selector);

    if (indexOf != -1) {
      this.selectors.splice(indexOf, 1);
    }
  }

  onAddExecutionTime() {
    // const dayOfWeek = this.dayOfWeek;
    // const hour = this.hourControl.value;
    // const minute = this.minuteControl.value;
    // this.executionTimes.push({ dayOfWeek, hour, minute });
    // // Reset fields
    // this.dayOfWeek = (dayOfWeek + 1) % 7; // Saturday -> Sunday, Sunday -> Monday
    // this.hourControl.setValue(8);
    // this.minuteControl.setValue(0);
  }

  onCheckValidity() {
    for (const i in this.metainformationGroup.controls) {
      this.metainformationGroup.controls[i].markAsDirty();
      this.metainformationGroup.controls[i].updateValueAndValidity();
    }
  }

  onRemoveExecutionTime(et: ExecutionTime) {
    const indexOf = this.executionTimes.indexOf(et);

    if (indexOf != -1) {
      this.executionTimes.splice(indexOf, 1);
    }
  }

  onSubmit() {
    // const job: Job = {
    //   ...this.job,
    //   name: this.name,
    //   url: this.url,
    //   selectors: this.selectors,
    //   executionTimes: this.executionTimes,
    // };
    // this.submitted.emit(job);
  }

  onCancel() {
    this.cancelled.emit();
  }
}
