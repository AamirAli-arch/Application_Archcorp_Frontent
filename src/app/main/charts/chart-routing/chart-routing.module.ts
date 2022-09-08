import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TaskTimesheetComponent } from '../task-timesheet/task-timesheet.component';

const routes: Routes = [
  { path: '', redirectTo: '/timesheet', pathMatch: 'full' },
  { path: 'timesheet', component: TaskTimesheetComponent}
];
export const appRouting = RouterModule.forRoot(routes);
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class ChartRoutingModule { }
