import { NgModule } from '@angular/core';
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

import { ResourceAssignmentComponent } from './resource-assignment.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes = [
  {
      path     : 'resource-assignment',
      component: ResourceAssignmentComponent
  }
];

@NgModule({
  declarations: [ResourceAssignmentComponent],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableExporterModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class ResourceAssignmentModule { }
