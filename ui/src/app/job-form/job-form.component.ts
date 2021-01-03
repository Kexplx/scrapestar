import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Job } from '../models/job';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss'],
})
export class JobFormComponent implements OnInit {
  @Input() job: Job | undefined;
  formGroup!: FormGroup;

  get name(): FormControl {
    return this.formGroup.get('name') as FormControl;
  }

  get url(): FormControl {
    return this.formGroup.get('url') as FormControl;
  }

  get selectors(): FormArray {
    return this.formGroup.get('selectors') as FormArray;
  }

  get executionTimes(): FormArray {
    return this.formGroup.get('executionTimes') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.job ??= this.generateDefaultJob();

    const { name, url, selectors, executionTimes } = this.job;

    this.formGroup = this.fb.group({
      name,
      url,
      selectors: new FormArray(
        selectors.map(({ cssSelector, name }) => this.fb.group({ name, cssSelector })),
      ),
      executionTimes: new FormArray(
        executionTimes.map(({ dayOfWeek, hour, minute }) =>
          this.fb.group({ dayOfWeek, hour, minute }),
        ),
      ),
    });
  }

  onAddSelector() {
    const group = this.fb.group({
      name: '',
      cssSelector: '',
    });

    this.selectors.push(group);
  }

  onAddExecutionTime() {
    const group = this.fb.group({
      dayOfWeek: 1,
      hour: 8,
      minute: 0,
    });

    this.executionTimes.push(group);
  }

  private generateDefaultJob(): Job {
    const job: Job = {
      name: '',
      url: '',
      selectors: [],
      executionTimes: [
        { dayOfWeek: 1, hour: 8, minute: 0 }, // Monday
        { dayOfWeek: 2, hour: 8, minute: 0 },
        { dayOfWeek: 3, hour: 8, minute: 0 },
        { dayOfWeek: 4, hour: 8, minute: 0 },
        { dayOfWeek: 5, hour: 8, minute: 0 },
        { dayOfWeek: 6, hour: 10, minute: 0 }, // Saturday
      ],
    };

    return job;
  }
}
