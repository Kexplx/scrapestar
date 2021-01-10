import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CreateJobComponent } from './create-job/create-job.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { JobCardComponent } from './job-card/job-card.component';
import { JobFormComponent } from './job-form/job-form.component';
import { JobListComponent } from './job-list/job-list.component';
import { RouterModule, Routes } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { JobCreatedResultComponent } from './create-job/job-created-result/job-created-result.component';
import { NotFoundComponent } from './not-found/not-found.component';
registerLocaleData(en);

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'jobs' },
  { path: 'jobs', pathMatch: 'full', component: JobListComponent },
  { path: 'jobs/:id/edit', component: EditJobComponent },
  { path: 'jobs/create', pathMatch: 'full', component: CreateJobComponent },
  { path: 'jobs/create/result', component: JobCreatedResultComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CreateJobComponent,
    EditJobComponent,
    JobCardComponent,
    JobFormComponent,
    JobListComponent,
    JobCreatedResultComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    SharedModule,
  ],
  // providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpProxy, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
