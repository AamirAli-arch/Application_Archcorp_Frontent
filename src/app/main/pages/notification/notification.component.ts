import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Employee } from 'app/main/charts/chart/services/ApiServices';
import { merge, Observable, of as observableOf } from 'rxjs';
import * as moment from 'moment';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NotificationService } from './services/notification.service';
import { NotificationRequest } from './models/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],

})
export class NotificationComponent implements OnInit {
  moment = moment;
  displayedColumns = ['title', 'content', 'startdate'];
  dataSource: NotificationService | null;
  employees: Employee[];
  resultsLength = 0;
  filteredAndPaged: Observable<Notification[]>;

  filterForm: FormGroup;
  isLoadingResults = true;
  statusValue = [
    {id:1, name: "Viewed"},
    {id:2, name: "NotViewed"},
  ]
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fb: FormBuilder, private _notificationService: NotificationService, private _httpClient: HttpClient) {

  }
  ngOnInit(): void {
    this.isLoadingResults = false;
    this.filterForm = this.fb.group({
      status: new FormControl(2),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    });

  }
  ngAfterViewInit(): void {
    this.getNotificationList();
  }
  getNotificationList() {
    this.dataSource = new NotificationService(this._httpClient);

    this.filteredAndPaged = merge(
      this.paginator.page,
      this.filterForm.get('status').valueChanges,
      this.filterForm.get('startDate').valueChanges,
      this.filterForm.get('endDate').valueChanges
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const request = new NotificationRequest();
          request.currentPage = this.paginator.pageIndex + 1;
          request.pageSize = this.paginator.pageSize;
          request.status = this.filterForm.controls['status'].value;
          request.start = this.filterForm.controls['startDate'].value == '' ? null : this.fixDate(this.filterForm.controls['startDate'].value);
          request.end = this.filterForm.controls['endDate'].value == '' ? null : this.fixDate(this.filterForm.controls['endDate'].value);
      
          return this._notificationService.getNotification(request);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.totalCount;
          return data.notifications;
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








}
