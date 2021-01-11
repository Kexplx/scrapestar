import { RecurrenceRule, scheduleJob, Job as ScheduledJob } from 'node-schedule';
import { JobDtoStore } from '../job-dto-store';
import { Job } from '../job/job';

export class JobScheduler {
  private scheduledExecutionsPerJob = new Map<string, ScheduledJob[]>();

  constructor(private store: JobDtoStore) {}

  schedule(job: Job): void {
    this.scheduledExecutionsPerJob.set(job.id, []);

    for (const { dayOfWeek, hour, minute } of job.executionTimes) {
      const rule = new RecurrenceRule();
      rule.dayOfWeek = dayOfWeek;
      rule.hour = hour;
      rule.minute = minute;

      const scheduledExecution = scheduleJob(rule, async () => {
        await job.execute();

        if (job.dto.executionResult) {
          this.store.update(job.id, job.dto);
        }
      });

      const scheduledExecutions = this.scheduledExecutionsPerJob.get(job.id)!;
      scheduledExecutions.push(scheduledExecution);
    }
  }

  cancel(id: string): void {
    const scheduledExecutions = this.scheduledExecutionsPerJob.get(id);

    if (scheduledExecutions) {
      for (const execution of scheduledExecutions) {
        execution.cancel();
      }

      this.scheduledExecutionsPerJob.delete(id);
    }
  }
}
