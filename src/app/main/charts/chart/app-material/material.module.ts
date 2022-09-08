import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatSliderModule } from '@angular/material/slider'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTreeModule } from '@angular/material/tree'
import { MatCardModule } from '@angular/material/card'
import { MatProgressBarModule } from '@angular/material/progress-bar'

import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  exports: [
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatToolbarModule,
    MatTreeModule,
    MatMomentDateModule,
    MatCardModule,
    MatProgressBarModule
  ]
})
export class MaterialModule { }
