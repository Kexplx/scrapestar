import express from 'express';
import { JobDtoStore } from './job-dto-store';
import { Job } from './job';
import { JobScheduler } from './job-scheduler';
import { router as jobRouter } from './routes/jobs';
import { errorHandler } from './middleware/error-handler';

(async () => {
  const PORT = 3000;

  const app = express();
  const store = JobDtoStore.getInstance();
  const scheduler = JobScheduler.getInstance(store);

  // Load all jobs from the store and schedule them.
  const jobDtos = await store.findAll();

  for (const jobDto of jobDtos) {
    const job = new Job(jobDto);

    scheduler.schedule(job);
  }

  // Setup routes and middleware.
  app.use('/jobs', jobRouter);
  app.use(errorHandler);
  app.use(express.json());

  app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
})();
