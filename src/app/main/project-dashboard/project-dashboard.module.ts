import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDashboardComponent } from './view-dashboard/view-dashboard.component';
import { DxBulletModule, DxDataGridModule, DxTemplateModule,DxButtonModule } from 'devextreme-angular';
import { MatTableModule, } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FormsModule } from '@angular/forms';
import { DxSchedulerModule, DxDraggableModule, DxScrollViewModule } from 'devextreme-angular';

// import { ViewEmployeeComponent } from './view-employee/view-employee.component';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
 import { MatButtonModule } from '@angular/material/button';
 import { MatIconModule } from '@angular/material/icon';
 import { ProjectNotesModule } from '../pages/project-notes/project-notes.module';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { MatSelectModule } from '@angular/material/select';
// import { FuseSharedModule } from '@fuse/shared.module';
// import dxDraggable from 'devextreme/ui/draggable';

const routes = [
  {
      path     : 'view-dashboard',
      component:  ViewDashboardComponent
  },
//   {
//     path     : 'view-employee',
//     component:  ViewEmployeeComponent
// },
]
@NgModule({
  declarations: [ViewDashboardComponent, ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DxDataGridModule,
    DxSchedulerModule,
    DxDraggableModule,
    DxScrollViewModule,
    DxTemplateModule,
    DxBulletModule,
    MatTableModule,
    FormsModule,    
    MatIconModule,
    MatButtonModule,
    FuseSharedModule,
    ProjectNotesModule,
    DxButtonModule,
  ],
  entryComponents: [
    
],
})
export class ProjectDashboardModule { }
