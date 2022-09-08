import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from './chart/app-material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResizableModule } from 'angular-resizable-element';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { SatPopoverModule } from '@ncstate/sat-popover';


import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

import 'hammerjs';

import { ChartComponent } from './chart/chart.component';
import { TaskAllocationComponent } from './task-allocation/task-allocation.component'

import { FuseSharedModule } from '@fuse/shared.module';
import { AuthGuard } from 'app/main/guards/auth.guard'

import { 
  API_BASE_URL,
  AuthClient,
  ProjectClient,
  TaskClient,
  DepartmentClient,
  TaskResourceClient,
  TaskTimeSheetClient,
  ResourceTaskScheduleClient,
  TaskLinkClient,
 } from './chart/services/ApiServices'
 import { environment } from 'environments/environment';
 import { AgmCoreModule } from '@agm/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../services/auth/token.interceptor'
import { UniqueResourcePipe } from '../../main/pipes/unique-resource.pipe';
import { TaskTimesheetComponent } from './task-timesheet/task-timesheet.component';
import { InlineEditComponent } from './task-timesheet/inline-edit/inline-edit.component';




const routes = [
  {
      path     : ':id',
      component: ChartComponent,
      canActivate: [AuthGuard]
  }
];


@NgModule({
  declarations: [
    ChartComponent,
    TaskAllocationComponent,
    UniqueResourcePipe,
    TaskTimesheetComponent,
    InlineEditComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDS78QZRRCM0kEIjskHs6kOh5xk6IOnI2M'
    }),
    MatTooltipModule,
    ResizableModule,
    SatPopoverModule,
    FormsModule,
    MaterialModule, FormsModule, ReactiveFormsModule,
    MatIconModule,
    CdkTableModule,
    CdkTreeModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatTableModule,
    MatTabsModule,
    
  ],
  exports : [
    ChartComponent
  ],
  providers:[
    AuthClient,
    ProjectClient,
    TaskClient, 
    DepartmentClient,
    TaskResourceClient,
    TaskTimeSheetClient,
    TaskLinkClient,
    ResourceTaskScheduleClient,

    { 
      provide: API_BASE_URL, 
      useValue: environment.apiUrl 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    
  ],
  entryComponents: [TaskAllocationComponent, TaskTimesheetComponent]
})
export class ChartsModule { }
