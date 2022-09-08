import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/common/app-material/material.module';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from "@fuse/shared.module";
import { API_BASE_URL, AuthClient } from '../pages/projects/services/ApiServices';
import { environment } from 'environments/environment';
import { SelfTaskManagerComponent } from './self-task-manager/self-task-manager.component';
import { PmrsDashboardComponent } from './pmrs-dashboard.component';
import { ClosedActivitiesComponent } from './self-task-manager/closed-activities.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { TasksTimesheetComponent } from './tasks-timesheet/tasks-timesheet.component';
import { TaskAssignmentsComponent } from './tasks-timesheet/task-assignments/task-assignments.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ActivePendingActivitiesComponent } from './self-task-manager/active-pending-activities/active-pending-activities.component';
import { CompletedActivitiesComponent } from './self-task-manager/completed-activities/completed-activities.component';
import { AddSelfAllocatedTaskComponent } from './tasks-timesheet/add-self-allocated-task/add-self-allocated-task.component';
import { TimesheetCalenderComponent } from './tasks-timesheet/timesheet-calender/timesheet-calender.component';  
import { DxSchedulerModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { CompletedClosedTasksComponent } from './tasks-timesheet/completed-closed-tasks/completed-closed-tasks.component';
import { RiskRegisterComponent } from './risk-register/risk-register.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from "@angular/material/badge";
import { AppPipesModule } from '../pipes/app-pipes.module';
import { ProjectPmrsDashboardComponent } from './project-pmrs-dashboard/project-pmrs-dashboard.component';
import { ProjectDetailsTabComponent } from './project-pmrs-dashboard/project-details-tab/project-details-tab.component';

const routes = [
  {
      path     : 'pmrs-dashboard',
      component:  PmrsDashboardComponent
  },

  {
    path     : 'project-pmrs-dashboard',
    component:  ProjectPmrsDashboardComponent
},
  {
    path     : 'self-task-manager',
    component:  SelfTaskManagerComponent  
  },
  {
    path: 'active-pending-activities',
    component: ActivePendingActivitiesComponent

  },
  {
    path: 'completed-activities',
    component: CompletedActivitiesComponent

  },

  {
    path: 'tasks-timesheet',
    component: TasksTimesheetComponent

  },

  {
    path: 'add-self-allocated-task',
    component: AddSelfAllocatedTaskComponent

  },

  {
    //path: 'tasks-task-assignments',
    path: 'task-assignments',
    component:TaskAssignmentsComponent

  },
  {
    path: 'timesheet-calender',
    component: TimesheetCalenderComponent
  },

  {
    path: 'closed-activities',
    component: ClosedActivitiesComponent

  },
  {
    path: 'completed-closed-tasks',
    component: CompletedClosedTasksComponent

  },
  //Risk-Register
  {
    path: 'risk-register',
    component: RiskRegisterComponent

  },

  


]

@NgModule({
  declarations: [
    PmrsDashboardComponent,
     SelfTaskManagerComponent,
     ClosedActivitiesComponent, 
     TasksTimesheetComponent,
     TaskAssignmentsComponent,
     ActivePendingActivitiesComponent,
     CompletedActivitiesComponent,
     AddSelfAllocatedTaskComponent,
     TimesheetCalenderComponent,
     TimesheetCalenderComponent,
     CompletedClosedTasksComponent,
     RiskRegisterComponent,
     ProjectPmrsDashboardComponent,
     ProjectDetailsTabComponent,
    ],


  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FuseSharedModule,
    MaterialModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatInputModule,
    MatExpansionModule,
    CdkAccordionModule,
    MatDialogModule,
    FuseSharedModule,
    DxSchedulerModule,
    HttpClientModule,  
    MatIconModule,
    MatBadgeModule,
    AppPipesModule,
  ],
  exports:[
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    
  ],
  entryComponents: [
  AddSelfAllocatedTaskComponent,
  ],
  providers: [
    AuthClient,
  
    {
        provide: API_BASE_URL,
        useValue: environment.apiUrl,
    },
],
})
export class ProjectPmrsModule { }
