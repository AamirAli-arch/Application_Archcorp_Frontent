import { NgModule } from '@angular/core';
import { ResourcesComponent } from './resources.component';
import { ResourceProjectsComponent } from './resource-projects/resource-projects.component';
import { RouterModule } from '@angular/router';

import {MatListModule} from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewAssignmentsComponent } from './view-assignments/view-assignments.component';

const routes = [
  {
      path     : 'resources',
      component: ResourcesComponent
  }
];


@NgModule({
  declarations: [ResourcesComponent, ResourceProjectsComponent, ViewAssignmentsComponent],
  imports: [
    FuseSharedModule,
    RouterModule.forChild(routes),

    MatListModule,
    FlexLayoutModule,
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
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
  ]
})
export class ResourcesModule { }
