import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { EmployeeTimelineComponent } from './employee-timeline.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AppPipesModule } from 'app/main/pipes/app-pipes.module';

const routes = [
    {
        path: "mytimeline",
        component: EmployeeTimelineComponent,
    },
];


@NgModule({
  declarations: [EmployeeTimelineComponent],
  imports: [CommonModule, FuseSharedModule, RouterModule.forChild(routes), MatTableExporterModule,AppPipesModule],
})
export class EmployeeTimelineModule { }
