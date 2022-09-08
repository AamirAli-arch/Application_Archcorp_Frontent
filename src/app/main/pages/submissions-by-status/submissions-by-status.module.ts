import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmissionsByStatusComponent } from './submissions-by-status.component';
import { RouterModule } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import {
  API_BASE_URL,
  ProjectClient
} from "../../charts/chart/services/ApiServices";
import { environment } from '../../../../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppPipesModule } from 'app/main/pipes/app-pipes.module';

const routes = [
  {
      path     : 'submissions-by-status',
      component: SubmissionsByStatusComponent
  }
];

@NgModule({
  declarations: [],
  imports: [    
    RouterModule.forChild(routes),
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
    MatPaginatorModule,
    AppPipesModule,
  ],
  providers: [
    ProjectClient,
    { 
      provide: API_BASE_URL, 
      useValue: environment.apiUrl 
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SubmissionsByStatusModule { }
