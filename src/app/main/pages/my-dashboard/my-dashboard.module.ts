import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDashboardComponent } from './my-dashboard.component';
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
import { MatDialogModule } from "@angular/material/dialog";
import { AppPipesModule } from 'app/main/pipes/app-pipes.module';
import { SubmissionsByStatusComponent } from '../submissions-by-status/submissions-by-status.component';
import { SubmissionsByStatusModule } from '../submissions-by-status/submissions-by-status.module';
import { ProjectsCurrentResourcesComponent } from './tabs/projects-current-resources/projects-current-resources.component';
import { DxTreeListModule } from 'devextreme-angular';
import { AuthorityDashboardComponent } from './tabs/authority-dashboard/authority-dashboard.component';
import { NotesDashboardComponent } from '../project-notes/notes-dashboard/notes-dashboard.component';
import { ProjectNotesModule } from '../project-notes/project-notes.module';



const routes = [
  {
      path     : 'my-dashboard',
      component: MyDashboardComponent
  }
];

@NgModule({
  declarations: [MyDashboardComponent, SubmissionsByStatusComponent, ProjectsCurrentResourcesComponent, AuthorityDashboardComponent],
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
    MatDialogModule,
    SubmissionsByStatusModule,
    DxTreeListModule,
    ProjectNotesModule
    
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

export class MyDashboardModule { }
