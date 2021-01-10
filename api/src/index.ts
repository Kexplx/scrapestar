import express from 'express';
import { JobDtoStore } from './job-dto-store';
import { JobScheduler } from './scheduler/job-scheduler';
import { router as jobRouter } from './routes/jobs';
import { errorHandler } from './middleware/error-handler';
import cors from 'cors';
import { Job } from './job/job';

const PORT = 3000;

(async () => {
  const app = express();

  const store = new JobDtoStore();
  const scheduler = new JobScheduler(store);

  // Load all jobs from the store and schedule them.
  const jobDtos = await store.findAll();

  for (const jobDto of jobDtos) {
    const job = new Job(jobDto);

    scheduler.schedule(job);
  }

  // Setup middleware and routes.
  app.use(cors());
  app.use(errorHandler);
  app.use(express.json());

  app.use('/jobs', jobRouter);

  app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
})();
