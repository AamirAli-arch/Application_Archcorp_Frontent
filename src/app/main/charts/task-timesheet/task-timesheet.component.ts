import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletePopupComponent } from 'app/main/pages/delete-popup/delete-popup.component';
import { MessageNotifierService } from 'app/services/message-notifier.service';
import { update } from 'lodash';

import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetResourceTaskScheduleRequest, GetTaskTimeSheetForUserRequest, GetTaskTimeSheetForUserResonse, RemoveResourceScheduleRequest, ResourceTaskScheduleClient, ResourceTaskScheduleDto, TaskTimeSheetClient, TaskTimeSheetDto, UpdateResourceTaskScheduleRequest } from '../chart/services/ApiServices';
const moment = extendMoment(Moment);


export interface TimeSheeet {
  checkIn: string;
  checkOut: string;
  checkInLocation: string;
  checkOutLocation: string;
  checkInNotes: string;
  checkOutNotes: string;
}


export interface Element {
  name: string;
  symbol: string;
  comment?: string;
}

const initialData: Element[] = [
  {name: 'Hydrogen', symbol: 'H'},
  {name: 'Helium', symbol: 'He'},
  {name: 'Lithium', symbol: 'Li'},
  {name: 'Beryllium', symbol: 'Be'},
  {name: 'Boron', symbol: 'B'},
  {name: 'Carbon', symbol: 'C'},
  {name: 'Nitrogen', symbol: 'N'},
  {name: 'Oxygen', symbol: 'O'},
  {name: 'Fluorine', symbol: 'F'},
  {name: 'Neon', symbol: 'Ne'},
  {name: 'Sodium', symbol: 'Na'},
  {name: 'Magnesium', symbol: 'Mg'},
  {name: 'Aluminum', symbol: 'Al'},
  {name: 'Silicon', symbol: 'Si'},
  {name: 'Phosphorus', symbol: 'P'},
  {name: 'Sulfur', symbol: 'S'},
  {name: 'Chlorine', symbol: 'Cl'},
  {name: 'Argon', symbol: 'Ar'},
  {name: 'Potassium', symbol: 'K'},
  {name: 'Calcium', symbol: 'Ca'},
];



@Component({
  selector: 'app-task-timesheet',
  templateUrl: './task-timesheet.component.html',
  styleUrls: ['./task-timesheet.component.scss']
})
export class TaskTimesheetComponent implements OnInit {
  moment = moment;
  displayedColumns: string[] = ['checkIn', 'checkOut', 'checkInLocation', 'checkOutLocation' , 'checkInNotes', 'checkOutNotes'];
  dataSource : TaskTimeSheetDto[];
  currentUser: any;


  timeDisplayedColumns = ['delete','startDate', 'endDate', 'allocatedHours'];
  dataTimeSource: ResourceTaskScheduleDto[];

  constructor(
    public dialogRef: MatDialogRef<TaskTimesheetComponent>, 
    public _taskTimesheetClient : TaskTimeSheetClient,private dialog: MatDialog,
    public _resourceTaskSchedule : ResourceTaskScheduleClient,
    public _snackBar: MatSnackBar,private _messageNotification:MessageNotifierService,
    @Inject(MAT_DIALOG_DATA) public data : any) {
      dialogRef.disableClose = false;
     }

  ngOnInit(): void {
    this.getUserTimeSheet();
    this.getUserSchedule();
  }

  deleteTimeAllocation(id){
    const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.panelClass = "delete-modal";
        const dialogRef = this.dialog.open(
            DeletePopupComponent,
            dialogConfig
        );
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                const request = new RemoveResourceScheduleRequest();
                request.id = id;
                this._resourceTaskSchedule.removeScheduleApproval(request).subscribe(resp => {
                    this._messageNotification.successMessage("Deleted");
                  this.getUserTimeSheet();
                  this.getUserSchedule();
                },error => {
                    this._messageNotification.errorMessage(error.errorMessage);
                })
            }
        });

  }

  updateHours(time : UpdateResourceTaskScheduleRequest){
    const updateTime = new UpdateResourceTaskScheduleRequest();
    updateTime.id = time.id;
    updateTime.allocatedHours = time.allocatedHours;
    updateTime.taskResourceId = time.taskResourceId;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {Type:'update'};
    dialogConfig.panelClass = "delete-modal";
    const dialogRef = this.dialog.open(
        DeletePopupComponent,
        dialogConfig
    );
    dialogRef.afterClosed().subscribe((data) => {
        if (data) {
        this._resourceTaskSchedule.updateResourceTaskSchedule(updateTime).subscribe(resp => {
            this._messageNotification.successMessage("Updated");
          this.getUserTimeSheet();
          this.getUserSchedule();
        },error => {
            this._messageNotification.errorMessage(error.errorMessage);
        })
    }
    })

  }

  getUserTimeSheet(){
    const timeSheet = new GetTaskTimeSheetForUserRequest();
    timeSheet.employeeId = this.data.employeeId;
    timeSheet.taskId = this.data.taskId;
    this._taskTimesheetClient.taskTimeSheetPost(timeSheet).subscribe(resp => {
      this.dataSource = resp.taskTimeSheet;
    })
  }

  getUserSchedule(){
    const scheduleRequest = new GetResourceTaskScheduleRequest();
    scheduleRequest.resourceId = this.data.employeeId;
    scheduleRequest.taskId = this.data.taskId;
    this._resourceTaskSchedule.getResourceTaskSchedule(scheduleRequest).subscribe(resp => {
      this.dataTimeSource = resp.resourceSchedule;
    })
  }

  // update(el: Element, comment: string) {
  //   if (comment == null) { return; }
  //   // copy and mutate
  //   const copy = this.dataTimeSource.data().slice()
  //   el.comment = comment;
  //   this.dataTimeSource.update(copy);
  // }

}


export class TimeAssignDataSource extends DataSource<any> {

  private dataSubject = new BehaviorSubject<Element[]>([]);

  data() {
    return this.dataSubject.value;
  }

  update(data) {
    this.dataSubject.next(data);
  }

  constructor(data: any[]) {
    super();
    this.dataSubject.next(data);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return this.dataSubject;
  }

  disconnect() {}
}
