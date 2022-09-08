import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkedHoursPipe } from './worked-hours.pipe';
import { LeaveStatusPipe } from './leave-status.pipe';
import { NotificationpipePipe } from './notificationpipe.pipe';
import { UsernamePipe } from './username.pipe';
import { AreaSumPipe } from './area-sum.pipe';
import { BedroomNamePipe } from './bedroom-name.pipe';
import { GroupAreaPipe } from './group-area.pipe';
import { SqmConvertPipe } from './sqm-convert.pipe';
import { LeaveTypePipe } from './Leave-type.pipe';
import { EmploymentStatusPipe } from './employment-status.pipe';
import { CustomNamePipe } from './custom-name-pipe.pipe';


@NgModule({
  declarations: [
    WorkedHoursPipe, 
    LeaveStatusPipe, 
    NotificationpipePipe, 
    UsernamePipe, 
    AreaSumPipe, 
    BedroomNamePipe, 
    GroupAreaPipe, 
    SqmConvertPipe,
    LeaveTypePipe,
    EmploymentStatusPipe,
    CustomNamePipe,
    
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WorkedHoursPipe, 
    LeaveStatusPipe, 
    NotificationpipePipe, 
    UsernamePipe, 
    AreaSumPipe, 
    BedroomNamePipe, 
    SqmConvertPipe,
    LeaveTypePipe,
    EmploymentStatusPipe,
    CustomNamePipe,
    
  ]
})

export class AppPipesModule { }
