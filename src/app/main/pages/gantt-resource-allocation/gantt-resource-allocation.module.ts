import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttResourceAllocationComponent } from './gantt-resource-allocation.component';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxDailyGanttChartModule } from 'ngx-daily-gantt-chart';


const routes = [
    {
        path: "gantt-resource",
        component: GanttResourceAllocationComponent,
    },

];

@NgModule({
  declarations: [GanttResourceAllocationComponent],
  imports: [CommonModule, FuseSharedModule, RouterModule.forChild(routes), NgxDailyGanttChartModule ],
})
export class GanttResourceAllocationModule { }
