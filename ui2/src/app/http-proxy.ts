import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Job } from './models/job';

/**
 * A Proxy that immitates the backend.
 * Use for development only.
 */
@Injectable()
export class HttpProxy implements HttpInterceptor {
  private jobs: Job[] = [
    {
      url: 'https://www.wikipedia.org/',
      _id: '1203012931238821',
      name: 'Job #1',
      executionTimes: [
        { dayOfWeek: 0, hour: 8, minute: 0 },
        { dayOfWeek: 0, hour: 8, minute: 0 },
        { dayOfWeek: 0, hour: 8, minute: 0 },
      ],
      selectors: [
        {
          name: 'title',
          cssSelector: '#www-wikipedia-org > div.central-textlogo > h1 > span',
        },
      ],
    },
    {
      url: 'https://www.wikipedia.org/',
      _id: '120301293138821',
      name: 'Job #1',
      executionTimes: [
        { dayOfWeek: 0, hour: 8, minute: 0 },
        { dayOfWeek: 0, hour: 8, minute: 0 },
        { dayOfWeek: 0, hour: 8, minute: 0 },
        { dayOfWeek: 0, hour: 8, minute: 0 },
        { dayOfWeek: 0, hour: 8, minute: 0 },
      ],
      selectors: [
        {
          name: 'title',
          cssSelector: '#www-wikipedia-org > div.central-textlogo > h1 > span',
        },
      ],
    },
  ];

  // private jobs: Job[] = [];

  intercept(req: HttpRequest<any>, next: any): Observable<HttpResponse<any>> {
    if (req.url.startsWith('assets')) {
      return next.handle(req);
    }

    const method: 'GET' | 'POST' | 'DELETE' | 'PUT' = req.method as any;
    let sourc$: Observable<any>;
    if (method === 'GET') {
      try {
        const id = this.getIdFromUrl(req.url);
        // singleGet
        sourc$ = this.get(id);
      } catch (error) {
        sourc$ = this.getAll();
      }
    } else if (method === 'DELETE') {
      sourc$ = this.delete(this.getIdFromUrl(req.url));
    } else if (method == 'PUT') {
      sourc$ = this.update(this.getIdFromUrl(req.url), req.body);
    } else {
      sourc$ = this.post(req.body);
    }

    // Simulate response time.
    return sourc$;
  }

  private post(job: Job) {
    this.jobs.push({
      _id: Math.floor(Math.random() * 1919199).toString(),
      ...job,
    });

    return of(new HttpResponse({ body: this.jobs }));
  }

  private getAll() {
    return of(new HttpResponse({ body: this.jobs }));
  }

  private delete(id: string) {
    this.jobs = this.jobs.filter(j => j._id !== id);

    return of(new HttpResponse({}));
  }

  private update(id: string, job: Job) {
    const indexOf = this.jobs.findIndex(j => j._id === id);

    if (indexOf != -1) {
      this.jobs[indexOf] = job;
    }

    return of(new HttpResponse({ body: job }));
  }

  private getIdFromUrl(url: string) {
    const idRegex = /http:\/\/localhost:3000\/jobs\/(.*)/;

    return idRegex.exec(url)![1].replace('/', '');
  }

  private get(id: string) {
    const job = this.jobs.find(j => j._id === id)!;

    return of(new HttpResponse({ body: job }));
  }
}
