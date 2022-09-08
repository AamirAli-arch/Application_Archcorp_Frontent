import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/common/app-material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AppPipesModule } from 'app/main/pipes/app-pipes.module';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';



const routes = [
  {
    path: 'notification',
    component: NotificationComponent
  },

 
];

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxMaterialTimepickerModule,
    MaterialModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    AppPipesModule,
    FuseSharedModule,
    MatTableExporterModule,
  ]
})
export class NotificationModule { }
