import { NgModule } from '@angular/core';
import { ReportsComponent } from './reports.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableExporterModule } from 'mat-table-exporter';
import {MatTooltipModule} from '@angular/material/tooltip';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DetailedReportsComponent } from './detailed-reports/detailed-reports.component';
import { AppPipesModule } from 'app/main/pipes/app-pipes.module';
import { MonthlyReportsComponent } from './monthly-reports/monthly-reports.component';
import { UsermonitorComponent } from './usermonitor/usermonitor.component';
import { ChartsModule } from 'ng2-charts';
import { GanttReportComponent } from './gantt-report/gantt-report.component';
import { RevitTrackingComponent } from './revit-tracking/revit-tracking.component';

import { 
  API_BASE_URL,
  ProjectClient,
 } from '../../charts/chart/services/ApiServices'
 import { environment } from '../../../../environments/environment';

import { RevitCalcComponent } from './revit-calc/revit-calc.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ReportTimeupdateComponent } from './report-timeupdate/report-timeupdate.component';
import { DatePipe } from '@angular/common';
import { RevitLevelAreaComponent } from './revit-level-area/revit-level-area.component';

const routes = [
  {
      path     : 'reports',
      component: ReportsComponent
  },
  {
    path     : 'detailed-reports',
    component: DetailedReportsComponent
  },
  {
    path     : 'monthly-reports',
    component: MonthlyReportsComponent
  },
  {
    path     : 'user-monitor',
    component: UsermonitorComponent
  },
  {
    path     : 'ganttmonthly-report',
    component: GanttReportComponent
  },
  {
    path     : 'revit-tracking',
    component: RevitTrackingComponent
  },
  {
    path     : 'revit-calculations',
    component: RevitCalcComponent
  },
  {
    path     : 'revit-level-area',
    component: RevitLevelAreaComponent 
  }
];

@NgModule({
  declarations: [GanttReportComponent, ReportsComponent, DetailedReportsComponent, MonthlyReportsComponent, UsermonitorComponent, RevitTrackingComponent,ReportTimeupdateComponent, RevitCalcComponent, RevitLevelAreaComponent],

  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    NgxMaterialTimepickerModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableExporterModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AppPipesModule,
    MatTooltipModule,
    ChartsModule
  ],
  
  providers: [
    ProjectClient,
    DatePipe,
    { 
      provide: API_BASE_URL, 
      useValue: environment.apiUrl 
    },]
})
export class ReportsModule { }
