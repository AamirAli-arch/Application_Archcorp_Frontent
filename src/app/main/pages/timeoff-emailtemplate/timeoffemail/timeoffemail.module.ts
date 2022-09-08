import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TimeoffemailComponent } from './timeoffemail.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseCountdownModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path     : 'timeoff',
        component: TimeoffemailComponent
    }
];

@NgModule({
  declarations: [TimeoffemailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FuseSharedModule,
    FuseCountdownModule,
    
  ]
})
export class TimeoffemailModule { }
