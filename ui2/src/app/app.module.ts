import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CreateJobComponent } from './create-job/create-job.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { JobCardComponent } from './job-card/job-card.component';
import { JobFormComponent } from './job-form/job-form.component';
import { JobListComponent } from './job-list/job-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpProxy } from './http-proxy';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'jobs' },
  { path: 'jobs', pathMatch: 'full', component: JobListComponent },
  { path: 'jobs/:id/edit', component: EditJobComponent },
  { path: 'create', component: CreateJobComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CreateJobComponent,
    EditJobComponent,
    JobCardComponent,
    JobFormComponent,
    JobListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpProxy, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
