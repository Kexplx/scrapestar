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
      executionTimes: [{ dayOfWeek: 0, hour: 8, minute: 0 }],
      selectors: [
        { name: 'title', cssSelector: '#www-wikipedia-org > div.central-textlogo > h1 > span' },
      ],
    },
  ];

  // private jobs: Job[] = [];

  intercept(req: HttpRequest<any>): Observable<HttpResponse<any>> {
    const method: 'GET' | 'POST' | 'DELETE' | 'PUT' = req.method as any;

    if (method === 'GET') {
      return this.getAll();
    } else if (method === 'DELETE') {
      return this.delete(this.getIdFromUrl(req.url));
    } else if (method == 'PUT') {
      return this.update(this.getIdFromUrl(req.url), req.body);
    } else {
      return this.post(req.body);
    }
  }

  private post(job: Job) {
    this.jobs.push({ _id: Math.floor(Math.random() * 1919199).toString(), ...job });

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
}
