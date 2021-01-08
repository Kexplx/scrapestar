import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZorroModule } from './zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeekDayPipe } from './pipes/week-day.pipe';
import { ZeroPrefixPipe } from './pipes/zero-prefix.pipe';
import { SliceWithPostfixPipe } from './pipes/slice-with-postfix.pipe';
import { CdkModule } from './cdk.module';

@NgModule({
  declarations: [WeekDayPipe, ZeroPrefixPipe, SliceWithPostfixPipe],
  exports: [
    ZorroModule,
    CdkModule,
    ZeroPrefixPipe,
    WeekDayPipe,
    SliceWithPostfixPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
