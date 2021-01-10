import puppeteer from 'puppeteer';
import { ExecutionResult } from '../interfaces/execution-result';
import { ExecutionTime } from '../interfaces/execution-time';
import { JobDto } from '../interfaces/job-dto';
import { Selector } from '../interfaces/selector';

export class Job {
  private _id?: string;
  private _url: string;
  private _name: string;
  private _selectors: Selector[];
  private _executionTimes: ExecutionTime[];
  private _executionResult?: ExecutionResult;

  set id(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id!;
  }

  get url(): string {
    return this._url;
  }

  get executionTimes() {
    return this._executionTimes;
  }

  get dto(): JobDto {
    const dto: JobDto = {
      _id: this._id,
      name: this._name,
      url: this._url,
      executionResult: this._executionResult,
      selectors: this._selectors,
      executionTimes: this._executionTimes,
    };

    return dto;
  }

  constructor(dto: JobDto) {
    this._id = dto._id;
    this._name = dto.name;
    this._executionResult = dto.executionResult;
    this._url = dto.url;
    this._executionTimes = dto.executionTimes;
    this._selectors = dto.selectors;
  }

  /**
   * Executes the job.
   *
   * 1. Loads the page by the jobs url
   * 2. Scrapes the page with the jobs selectors
   * 3. Saves the scrape result in `result`
   *
   * @example
   * await job.execute()
   * job.dto.executionResult // Results of the last execution.
   */
  async execute(): Promise<void> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Don't crash on invalid url.
    try {
      await page.goto(this._url);
    } catch (error) {
      browser.close();
      return;
    }

    const result: ExecutionResult = await page.evaluate((selectorsAsJson: string) => {
      // We are inside the pages context here.
      // Can use the browser APIs like `document` or `window`.
      // Can NOT use any variables or methods from outside this callback.
      const selectors: Selector[] = JSON.parse(selectorsAsJson);
      const scrapeResult: ExecutionResult = {};

      for (const { cssSelector, name } of selectors) {
        const textContent = document.querySelector(cssSelector)?.textContent ?? '';

        scrapeResult[name] = textContent.replace(/\s\s+/g, ' '); // Remove newlines, tabs and consecutive spaces.
      }

      return scrapeResult;
    }, JSON.stringify(this._selectors));

    this._executionResult = result;
    browser.close();
  }
}
