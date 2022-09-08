import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNoteComponent } from './create-note/create-note.component';
import { RouterModule } from '@angular/router';

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
import { NotesDashboardComponent } from './notes-dashboard/notes-dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { MatTableModule } from '@angular/material/table';
import { ProjectLevelComponent } from './project-level/project-level.component';
import { ViewProjectLevelCommentsComponent } from './view-project-level-comments/view-project-level-comments.component';
import { BrowserModule } from '@angular/platform-browser';
import { DxBulletModule, DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { EmployeeDropdownComponent } from '../employee-dropdown/employee-dropdown.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';


const routes = [
  {
      path     : 'create-notes',
      component: CreateNoteComponent
  },
  {
    path     : 'notes-dashboard',
    component: NotesDashboardComponent
  },
  {
    path     : 'project-levels',
    component: ProjectLevelComponent
  },

  {
    path     : 'view-project-level-comments',
    component: ViewProjectLevelCommentsComponent
  },
  
];


@NgModule({
  declarations: [CreateNoteComponent, NotesDashboardComponent, ProjectLevelComponent, ViewProjectLevelCommentsComponent,],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FuseSharedModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ChartsModule,    
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    MatTooltipModule,
    
    
  ],
  exports:[
    NotesDashboardComponent,
    CreateNoteComponent,
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
export class ProjectNotesModule { }
