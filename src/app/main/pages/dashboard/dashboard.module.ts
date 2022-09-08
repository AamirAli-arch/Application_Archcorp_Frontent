import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/common/app-material/material.module';
import { DashboardComponent } from './dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProjectDashboardService } from './project.service';

const routes = [
  {
      path     : 'dashboard',
      component: DashboardComponent,
  },
];


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    CommonModule,
    MaterialModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    

    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
  
    MatTableModule,
    MatTabsModule,

    NgxChartsModule,
    FuseSidebarModule,
    FuseWidgetModule
  ],
  providers   : [
    ProjectDashboardService
]
})
export class DashboardModule { }
