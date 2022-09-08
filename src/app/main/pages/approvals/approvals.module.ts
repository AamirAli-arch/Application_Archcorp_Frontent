import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalsComponent } from './approvals.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppPipesModule } from 'app/main/pipes/app-pipes.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes = [
  {
      path     : 'approvals',
      component: ApprovalsComponent
  }
];

@NgModule({
  declarations: [ApprovalsComponent],
  imports: [
    CommonModule,
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
    MatProgressSpinnerModule,
    AppPipesModule,
    MatCheckboxModule,
    MatSnackBarModule
    
  ]
})
export class ApprovalsModule { }
