import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FuseSharedModule } from '@fuse/shared.module';
import { ViewStaffComponent } from './view-staff/view-staff.component';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DxDataGridModule, DxButtonModule, DxTemplateModule } from 'devextreme-angular';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { jsPDF } from 'jspdf';

import * as jspdf from 'jspdf';

const routes = [
  {
      path     : 'add-staff',
      component:  AddStaffComponent
  },
  {
    path: "view-staff",
    component: ViewStaffComponent,
  },
]


@NgModule({
  declarations: [AddStaffComponent, ViewStaffComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatFormFieldModule,
    FuseSharedModule,
    MatTableModule,
    MatTableExporterModule,
    MatTooltipModule,
    DxDataGridModule,
    DxButtonModule,
    DxTemplateModule,
  ]
})
export class StaffInfoModule { }
