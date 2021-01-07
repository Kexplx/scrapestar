import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpProxy } from './http-proxy';
import { JobCardComponent } from './job-card/job-card.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { RouterModule, Routes } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { JobFormComponent } from './job-form/job-form.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { ZeroPrefixPipe } from './job-form/pipes/zero-prefix.pipe';
import { SliceWithPostfixPipe } from './job-form/pipes/slice-with-postfix.pipe';
import { WeekDayPipe } from './job-form/pipes/week-day.pipe';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'jobs' },
  { path: 'jobs', pathMatch: 'full', component: JobListComponent },
  { path: 'jobs/:id/edit', component: EditJobComponent },
  { path: 'create', component: CreateJobComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ZeroPrefixPipe,
    SliceWithPostfixPipe,
    WeekDayPipe,
    EditJobComponent,
    JobCardComponent,
    JobListComponent,
    CreateJobComponent,
    JobFormComponent,
  ],
  imports: [BrowserModule, SharedModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpProxy, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
