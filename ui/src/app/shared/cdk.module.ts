import { NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  exports: [A11yModule, ClipboardModule],
})
export class CdkModule {}
