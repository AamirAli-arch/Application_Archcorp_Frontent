import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MetricDashboardComponent } from './metric-dashboard/metric-dashboard.component';
import { ListKeynoteDialogComponent } from './list-keynote-dialog/list-keynote-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import { RulesetsComponent } from './rulesets.component';
import { MatTableExporterModule } from 'mat-table-exporter';

const routes = [
  {
      path     : 'metric-dashboard',
      component: MetricDashboardComponent
  },
];

@NgModule({
  declarations: [MetricDashboardComponent, ListKeynoteDialogComponent],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatDialogModule,
    CommonModule,
    MatTableExporterModule,
    MatDividerModule
  ]
})
export class RulesetsModule { }
