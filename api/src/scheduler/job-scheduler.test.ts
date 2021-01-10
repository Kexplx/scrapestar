import { ExecutionTime } from '../interfaces/execution-time';
import { Job } from '../job/job';
import { JobScheduler } from './job-scheduler';

let storeMock: any;
let scheduler: JobScheduler;

beforeEach(() => {
  // 04.01.2021 8:25
  const monday8h25m = new Date(2021, 0, 4, 8, 25);

  jest.useFakeTimers('modern');
  jest.setSystemTime(monday8h25m.getTime());

  storeMock = { updateResult: jest.fn(async () => {}) };
  scheduler = new JobScheduler(storeMock);
});

describe('#schedule', () => {
  it('should call #execute on the job after 5 and 10 minutes', done => {
    const fiveMinutes = 5 * 60000;
    const executionTimes = [
      { dayOfWeek: 1, hour: 8, minute: 30 },
      { dayOfWeek: 1, hour: 8, minute: 35 },
    ];
    const jobMock = createJobMock(executionTimes);

    scheduler.schedule(jobMock);
    expect(jobMock.execute).not.toBeCalled(); // No call.

    jest.advanceTimersByTime(fiveMinutes);
    expect(jobMock.execute).toHaveBeenCalledTimes(1); // One call after 5 min.

    jest.advanceTimersByTime(fiveMinutes);
    expect(jobMock.execute).toHaveBeenCalledTimes(2); // Two calls after 10 min.
    done();
  });

  it('should not call #execute on a cancelled job', done => {
    const fiveMinutes = 5 * 60000;
    const executionTimes = [{ dayOfWeek: 1, hour: 8, minute: 30 }];
    const jobMock = createJobMock(executionTimes);

    scheduler.schedule(jobMock);
    scheduler.cancel(jobMock.id);

    jest.advanceTimersByTime(fiveMinutes);

    expect(jobMock.execute).not.toHaveBeenCalled();
    done();
  });
});

function createJobMock(executionTimes: ExecutionTime[]): Job {
  return {
    executionTimes,
    id: Math.random().toString(),
    dto: { executionResult: 'RESULT' },
    execute: jest.fn(async () => {}),
  } as any;
}
