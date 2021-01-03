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

@NgModule({
  exports: [
    MatCheckboxModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
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
