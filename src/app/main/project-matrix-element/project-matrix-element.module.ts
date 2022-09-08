import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProjectMatrixElementComponent } from './view-project-matrix-element/view-project-matrix-element.component';
import { RouterModule } from '@angular/router';
import { environment } from 'environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { FuseSharedModule } from '@fuse/shared.module';
import { ChartsModule } from 'ng2-charts';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { DxBulletModule, DxButtonModule, DxDataGridModule, DxTemplateModule, } from 'devextreme-angular';
import { MatTooltipModule } from '@angular/material/tooltip';


const routes = [
  {
      path     : 'view-project-matrix-element',
      component:  ViewProjectMatrixElementComponent
  },
//   {
//     path     : 'view-employee',
//     component:  ViewEmployeeComponent
// },
]

@NgModule({
  declarations: [ViewProjectMatrixElementComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CommonModule,
    FuseSharedModule,
    FlexLayoutModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,  
    MatFormFieldModule,
    ReactiveFormsModule,
    ChartsModule,   
    FormsModule, 
    DxBulletModule,
    DxDataGridModule,
    DxTemplateModule,
    MatTooltipModule,
    DxButtonModule,
    
  ]
})
export class ProjectMatrixElementModule { }
