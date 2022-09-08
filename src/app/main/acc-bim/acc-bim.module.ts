import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevitAreaComponent } from './revit-area/revit-area.component';
import { RouterModule } from '@angular/router';

import { API_BASE_URL } from '../charts/chart/services/ApiServices'
import { environment } from '../../../environments/environment';

import { DxTreeMapModule } from 'devextreme-angular';
import { BrowserModule } from '@angular/platform-browser';

const routes = [
  {
      path     : 'revit-area',
      component: RevitAreaComponent
  },
];

@NgModule({
  declarations: [RevitAreaComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DxTreeMapModule
  ],
  providers: [
    { 
      provide: API_BASE_URL, 
      useValue: environment.apiUrl 
    }
  ]

})
export class AccBimModule { }
