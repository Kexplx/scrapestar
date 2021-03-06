import { ExecutionTime } from './execution-time';
import { ExecutionResult } from './execution-result';
import { Selector } from './selector';

export interface JobDto {
  _id?: string;
  name: string;
  url: string;
  selectors: Selector[];
  executionTimes: ExecutionTime[];
  executionResult?: ExecutionResult;
}
