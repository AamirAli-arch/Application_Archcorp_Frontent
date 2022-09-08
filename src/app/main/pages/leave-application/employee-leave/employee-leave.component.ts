import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

import { EmpAttendance, Employee, ReportsRequest } from '../../reports/models/reportsRequest';
import { LeaveService } from '../services/leave.service';
import { ReportsService } from '../../reports/services/reports.service';
import { MatDialog } from '@angular/material/dialog';

import { NotificationService } from '../../notification/services/notification.service';
import { NotificationRequest } from '../../notification/models/notification';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderSpinerService } from '../../loader-spiner/loader-spiner.service';
import { LeaveRequest } from '../models/leave-application';
import { MessageNotifierService } from 'app/services/message-notifier.service';

const moment = extendMoment(Moment);

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.scss']
})
export class EmployeeLeaveComponent {
  moment = moment;
   //Leave Request Table Data
  displayedColumns = ['empName','createdDate', 'leaveType', 'startDate', 'endDate','startingHalf','endingHalf', 'currentStatus','actions'];
  dataSource: LeaveService | null;
  employees: Employee[];
  resultsLength = 0;
  filteredAndPaged: Observable<EmpAttendance[]>;
  statusArray;
  filterForm: FormGroup;
  isLoadingResults = true;
  getNotificationId: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private _notificationSub;
  constructor(private _notificationService: NotificationService, private _snackBar: MatSnackBar,
    private _loaderService:LoaderSpinerService,private _messageNotification:MessageNotifierService,
    public dialog: MatDialog, private fb: FormBuilder, private _leaveService: LeaveService, private _reportsService: ReportsService, private _httpClient: HttpClient) {

  }
  ngOnInit(): void {

    this.filterForm = this.fb.group({
      name: new FormControl([]),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      status: new FormControl(""),
    });
    this.statusArray=this._leaveService.leaveArray;
  }
  ngAfterViewInit(): void {
    // Mark as read notfication
     this._notificationSub= this._notificationService.getnotificationcount.subscribe((notficationId: any) => {
        if (notficationId) {
          const request = new NotificationRequest();
          request.id = notficationId;
          this._notificationService.markNotificationViewed(request).subscribe((response: any) => {
            if(response){
              this._notificationService.updateCount('');
            }
          })
        }
      })
    setTimeout(() => {
        // call API first time
        this.getLeaveList();
   }, );

  }
  getLeaveList() {
    this.dataSource = new LeaveService(this._httpClient);
    this.filteredAndPaged = merge(
      this.paginator.page,
      this.filterForm.get('name').valueChanges,
      this.filterForm.get('startDate').valueChanges,
      this.filterForm.get('endDate').valueChanges,
      this.filterForm.get('status').valueChanges
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const request = new LeaveRequest();
          request.currentPage = this.paginator.pageIndex + 1;
          request.pageSize = this.paginator.pageSize;
          request.employeeIds = this.filterForm.controls['name'].value;
          request.status= this.filterForm.controls["status"].value=="" ? 0: this.filterForm.controls["status"].value;
          request.startDate = this.filterForm.controls['startDate'].value == '' ? null : this.fixDate(this.filterForm.controls['startDate'].value);
          request.endDate = this.filterForm.controls['endDate'].value == '' ? null : this.fixDate(this.filterForm.controls['endDate'].value);
          this._loaderService.show();
          return this._leaveService.employeesLeaveRequest(request);
        }),
        map(data => {
            this._loaderService.hide();
          this.resultsLength = data.totalCount;
          this._notificationService.updateCount('');
          return data.employeeLeaves;
        }),
        catchError(() => {
            this._loaderService.hide();
          return observableOf([]);
        })
      )
  }

  fixDate(date) {
    date = new Date(date);
    let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
    let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
    date.setHours(hoursDiff);
    date.setMinutes(minutesDiff);
    return date;
  }

  getRecord(row) {
  
  }

  rejectMyLeave(leaveId: any) {
    const request = {
        id: leaveId,
    };
    this._loaderService.show();
    this._leaveService.cancelLeave(request).subscribe(
        (response: any) => {
            this._loaderService.hide();
            if (response) {
                this.getLeaveList();
                this._messageNotification.successMessage(response.successMessage);
            }
        },
        (error) => {
            this._loaderService.hide();
            this._messageNotification.errorMessage(error.error.errorMessage);
        }
    );
}
  ngOnDestroy() {
    this._notificationSub.unsubscribe();
}
}
