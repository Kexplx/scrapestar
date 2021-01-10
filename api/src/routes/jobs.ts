import { Router } from 'express';
import { JobDtoStore } from '../job-dto-store';
import { JobScheduler } from '../scheduler/job-scheduler';
import { JobDto } from '../interfaces/job-dto';
import { Job } from '../job/job';

export const router = Router();

const store = new JobDtoStore();
const scheduler = new JobScheduler(store);

router.get('/', async (_, res) => {
  const jobDtos = await store.findAll();

  res.send(jobDtos);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  const jobDto = await store.find(id);

  res.send(jobDto);
});

router.get('/:id/result', async (req, res) => {
  const id = req.params.id;

  const { executionResult } = await store.find(id);

  res.send(executionResult);
});

router.post('/', async (req, res) => {
  const jobDto: JobDto = req.body;
  const job = new Job(jobDto);

  // Execute job once immediately.
  await job.execute();
  job.id = await store.insert(job.dto);

  scheduler.schedule(job);

  res.send(job.dto);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const jobDto: JobDto = req.body;

  await store.update(id, jobDto);

  scheduler.cancel(id);
  scheduler.schedule(new Job(jobDto));

  res.end();
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  await store.delete(id);
  scheduler.cancel(id);

  res.end();
});
