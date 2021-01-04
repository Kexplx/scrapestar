import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpProxy } from './http-proxy';
import { JobCardComponent } from './job-card/job-card.component';
import { JobFormComponent } from './job-form/job-form.component';
import { CreateJobDialogComponent } from './create-job-dialog/create-job-dialog.component';
import { EditJobDialogComponent } from './edit-job-dialog/edit-job-dialog.component';

@NgModule({
  declarations: [AppComponent, JobCardComponent, JobFormComponent, CreateJobDialogComponent, EditJobDialogComponent],
  imports: [BrowserModule, SharedModule, HttpClientModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpProxy, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
