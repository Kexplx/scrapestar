import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { SliceWithPostfixPipe } from './pipes/slice-with-postfix.pipe';

@NgModule({
  declarations: [SliceWithPostfixPipe],
  exports: [
    MaterialModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    SliceWithPostfixPipe,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
