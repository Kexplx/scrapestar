import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpProxy } from './http-proxy';
import { JobCardComponent } from './job-card/job-card.component';
import { JobDialogComponent } from './job-dialog/job-dialog.component';

@NgModule({
  declarations: [AppComponent, JobCardComponent, JobDialogComponent],
  imports: [BrowserModule, SharedModule, HttpClientModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpProxy, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
