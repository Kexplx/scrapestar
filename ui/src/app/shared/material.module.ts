import { NgModule } from '@angular/core';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  exports: [
    MatCheckboxModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatButtonModule,
    ClipboardModule,
    A11yModule,
    MatDialogModule,
    MatTooltipModule,
    MatInputModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule,
  ],
})
export class MaterialModule {}
