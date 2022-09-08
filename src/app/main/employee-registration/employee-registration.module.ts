import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { FuseSharedModule } from '@fuse/shared.module';
import { FormsModule } from '@angular/forms';


const routes = [
  {
      path     : 'add-employee',
      component: AddEmployeeComponent
  },
]
@NgModule({
  declarations: [AddEmployeeComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSelectModule,
    FuseSharedModule,
    FormsModule,
  ],
    
})
export class EmployeeRegistrationModule { }
