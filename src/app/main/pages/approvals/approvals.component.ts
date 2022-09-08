import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { ApprovalsService } from './services/approvals.service';
import { Employee } from '../reports/models/reportsRequest';
import { ApprovalReport, ApprovalReportRequest, Approve } from './models/approvals';
import { ReportsService } from '../reports/services/reports.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageNotifierService } from 'app/services/message-notifier.service';
const moment = extendMoment(Moment);

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent implements OnInit, AfterViewInit {
  moment = moment;
  displayedColumns = ['select', 'employee', 'name', 'startDate', 'allocatedHours', 'actualHours', 'checkInDiff', 'checkOutDiff', 'actions'];
  dataSource: ApprovalsService | null;
  selection = new SelectionModel<ApprovalReport>(true, []);
  employees: Employee[];
  resultsLength = 0;
  filteredAndPaged: Observable<ApprovalReport[]>;
  

  filteredData: ApprovalReport[];

  filterForm: FormGroup;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,private _messageNotification:MessageNotifierService,
    private _approvalService: ApprovalsService,
    private _reportsService: ReportsService,
    private _snackBar: MatSnackBar,
    private _httpClient: HttpClient) { }

  ngAfterViewInit(): void {
    this.dataSource = new ApprovalsService(this._httpClient);

    this.filteredAndPaged = merge(
      this.paginator.page,
      this.filterForm.get('name').valueChanges,
      this.filterForm.get('startDate').valueChanges,
      this.filterForm.get('endDate').valueChanges,
      this.filterForm.get('status').valueChanges)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const request = new ApprovalReportRequest();
          request.currentPage = this.paginator.pageIndex + 1;
          request.pageSize = this.paginator.pageSize;
          request.employeeIds = this.filterForm.controls['name'].value;
          request.startDate = this.filterForm.controls['startDate'].value == '' ? null : this.fixDate(this.filterForm.controls['startDate'].value);
          request.endDate = this.filterForm.controls['endDate'].value == '' ? null : this.fixDate(this.filterForm.controls['endDate'].value);
          request.status = this.filterForm.controls['status'].value == null ? 0: this.filterForm.controls['status'].value;
          return this._approvalService.getReportsData(request);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.totalCount;
          this.filteredData = data.approvals;
          return data.approvals;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.resultsLength < this.paginator.pageSize ? this.resultsLength : this.paginator.pageSize;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() :
    this.filteredData.forEach(s => this.selection.select(s));
  }

  logSelection() {
    this.selection.selected.forEach(s => console.log(s));
  }

  approve(id){
    this._approvalService.approveSchedule(id).subscribe(response => {
        this._messageNotification.successMessage("Approved");
    //   this._snackBar.open("Approved", "", { 
    //     duration : 5000,
    //     horizontalPosition: 'center',
    //     verticalPosition: 'top',
    //   })
    })
  }

  approveAll(){
    if(this.selection.selected.length < 1){
        this._messageNotification.warningMessage("Please select a row.");
    //   this._snackBar.open("Please select a row.", "Done", { 
    //     duration : 5000,
    //     horizontalPosition: 'center',
    //     verticalPosition: 'top',
    //   })
    }else{
      const request = new Approve();
      const arrayId : number[] = [];
      this.selection.selected.forEach(element => {
        arrayId.push(element.id)
      })
      request.taskScheduleIds = arrayId;
      this._approvalService.approveSchedule(request).subscribe(response => {
        this._messageNotification.successMessage("Approved");
        // this._snackBar.open("Approved", "", { 
        //   duration : 5000,
        //   horizontalPosition: 'center',
        //   verticalPosition: 'top',
        // })
      })
    }
  }

  decline(id){
  }

  fixDate(date) {
    date = new Date(date);
    let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
    let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
    date.setHours(hoursDiff);
    date.setMinutes(minutesDiff);
    return date;
  }

  ngOnInit(): void {

    this.filterForm = this.fb.group({
      name: new FormControl([]),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      status: new FormControl()
    });

    this._reportsService.getEmployees().subscribe(response => {
      this.employees = response.employees;
    })
  }

}
