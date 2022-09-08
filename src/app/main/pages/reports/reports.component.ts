import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ReportsService } from './services/reports.service'
import { EmpAttendance, Employee, ReportsRequest } from './models/reportsRequest';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit, AfterViewInit {
  moment = moment;
  displayedColumns = ['name', 'date', 'checkIn', 'checkOut', 'workedHours'];
  dataSource: ReportsService | null;
  employees:any=[];
  resultsLength = 0;
  filteredAndPaged: Observable<EmpAttendance[]>;

  filterForm: FormGroup;
  isLoadingResults = true;
  filterList:any=[];
  employeeArray:any=[];
  getId:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fb: FormBuilder, private _reportsService: ReportsService, private _httpClient: HttpClient) {

  }

  ngAfterViewInit(): void {
      setTimeout(() => {
          this.getemployeList();
      }, );
  }
  getemployeList(){
    this.dataSource = new ReportsService(this._httpClient);
    this.filteredAndPaged = merge(
      this.paginator.page,
      this.filterForm.get('startDate').valueChanges,
      this.filterForm.get('endDate').valueChanges)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const request = new ReportsRequest();
          request.currentPage = this.paginator.pageIndex + 1;
          request.pageSize = this.paginator.pageSize;
          request.employeeIds =  this.getId;
          request.startDate = this.filterForm.controls['startDate'].value == '' ? null : this.fixDate(this.filterForm.controls['startDate'].value);
          request.endDate = this.filterForm.controls['endDate'].value == '' ? null : this.fixDate(this.filterForm.controls['endDate'].value);
          return this._reportsService.getReportsData(request);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.totalCount;
          return data.emplyeeAttendance;
        }),
        catchError(() => {
          this.isLoadingResults = false;
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

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      startDate: new FormControl(''),
      endDate: new FormControl('')
    });

  }
  getEmployeValue(data:any){
    this.getId=data;
    this.getemployeList();
  }
}

