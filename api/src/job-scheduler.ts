import { Job } from './models/job';
import { RecurrenceRule, scheduleJob, Job as ScheduledJob } from 'node-schedule';
import { JobDtoStore } from './data/job-dto-store';

export class JobScheduler {
  private static instance: JobScheduler | undefined;

  private scheduledJobs = new Map<string, ScheduledJob>();

  // Private constructor to prevent direct construction calls.
  // Clients should use the `getInstance` method.
  private constructor(private store: JobDtoStore) {}

  static getInstance(store: JobDtoStore): JobScheduler {
    if (!JobScheduler.instance) {
      JobScheduler.instance = new JobScheduler(store);
    }

    return JobScheduler.instance;
  }

  schedule(job: Job): void {
    for (const { dayOfWeek, hour, minute } of job.executionTimes) {
      const rule = new RecurrenceRule();
      rule.dayOfWeek = dayOfWeek;
      rule.hour = hour;
      rule.minute = minute;

      const scheduledJob = scheduleJob(rule, async () => {
        this.store.update(job.dto);
      });

      this.scheduledJobs.set(job.id, scheduledJob);
    }
  }

  cancel(job: Job): void {
    const scheduledJob = this.scheduledJobs.get(job.id);

    scheduledJob?.cancel();
  }

  cancelAll(): void {
    this.scheduledJobs.forEach(job => job.cancel());
  }
}
