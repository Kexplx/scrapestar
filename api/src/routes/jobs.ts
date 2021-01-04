import { Router } from 'express';
import { JobDtoStore } from '../job-dto-store';
import { JobScheduler } from '../job-scheduler';
import { Job } from '../job';
import { JobDto } from '../interfaces/job-dto';

/**
 * Router for handling requests to `/jobs`.
 */
export const router = Router();

const store = JobDtoStore.getInstance();
const scheduler = JobScheduler.getInstance(store);

router.get('/', async (_, res) => {
  const jobDtos = await store.findAll();

  res.send(jobDtos);
});

router.get('/:id/result', async (req, res) => {
  const id = req.params.id;

  const { executionResult } = await store.find(id);

  res.send(executionResult);
});

router.post('/', async (req, res) => {
  const jobDto: JobDto = req.body;
  const job = new Job(jobDto);

  // Execute job once immediately so client can see the results right away.
  await job.execute();
  job.id = await store.insert(job.dto);

  scheduler.schedule(job);

  res.send(job.dto);
});

router.put('/:id', async (req, res) => {
  const jobDto: JobDto = req.body;

  await store.update(jobDto);
  res.end();
});
