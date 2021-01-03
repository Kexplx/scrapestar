import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Job } from './models/job';

@Injectable()
export class HttpProxy implements HttpInterceptor {
  intercept(): Observable<HttpResponse<any>> {
    const body: Job[] = [
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

    const response = new HttpResponse({ body });

    return of(response);
  }
}
