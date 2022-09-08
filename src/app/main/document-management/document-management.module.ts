import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentManagementComponent } from './document-management.component';
import { RouterModule } from '@angular/router';

import { TreeModule } from '@circlon/angular-tree-component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'app/common/app-material/material.module';

const routes = [
  {
    path: '',
    component: DocumentManagementComponent
  },
];

@NgModule({
  declarations: [DocumentManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    MaterialModule,
    TreeModule,
    FlexLayoutModule
  ]
})
export class DocumentManagementModule { }
