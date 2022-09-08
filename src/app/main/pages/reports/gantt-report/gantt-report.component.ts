import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import {
    EmpAttendance,
    Employee,
    ReportsRequest,
} from "../models/reportsRequest";

import { ReportsService } from "../services/reports.service";
import { MatDialog } from "@angular/material/dialog";

import { NotificationService } from "../../notification/services/notification.service";
import { NotificationRequest } from "../../notification/models/notification";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LeaveService } from "../../leave-application/services/leave.service";
import * as moment from "moment";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";

@Component({
    selector: "app-gantt-report",
    templateUrl: "./gantt-report.component.html",
    styleUrls: ["./gantt-report.component.scss"],
})
export class GanttReportComponent {
    moment = moment;
    displayedColumns = [
        "serialNumber",
        "name",
        "startDate",
        "endDate",
        "workedDays",
        "hours",
        "actulDay",
        "allocatedHours",
        "monthlyHours",
        "hoursAfterSix",
        "actualmonthlyHours",
        "lateDay",
        "TotalLateHours",
        "timeoffHours",
        "leaveDay",
        "Absent",
        "PublicHolidays"
    ];
    dataSource: LeaveService | null;
    employees: Employee[];
    resultsLength = 0;
    filteredAndPaged: Observable<any>;
    getId: any;
    filterForm: FormGroup;
    isLoadingResults = true;
    getNotificationId: any;
    publicHolidays: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    location = [
        { name: "Dubai office, D1", value: "1" },
        { name: "Dubai office, D2", value: "2" },
        { name: "Dubai office", value: "3" },
        { name: "Dubai office, D4(Server Room)", value: "4" },
        { name: "Sharjah office, 601", value: "5" },
        { name: "Sharjah office, 602", value: "6" },
    ];

    constructor(
        private _loaderService: LoaderSpinerService,
        private _snackBar: MatSnackBar,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private _reportsService: ReportsService,
        private _httpClient: HttpClient
    ) {}
    ngOnInit(): void {
        this.filterForm = this.fb.group({
            startDate: new FormControl(""),
            endDate: new FormControl(""),
        });
    }
    ngAfterViewInit(): void {
        // call API first time
        setTimeout(() => {
            this.getLeaveList();
        });
    }
    getLeaveList() {
        this.dataSource = new LeaveService(this._httpClient);

        this.filteredAndPaged = merge(
            this.paginator.page,
            this.filterForm.get("startDate").valueChanges,
            this.filterForm.get("endDate").valueChanges
        ).pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                const request = new ReportsRequest();
                //   request.currentPage = this.paginator.pageIndex + 1;
                //   request.pageSize = this.paginator.pageSize;
                request.employeeIds = this.getId;
                request.startDate =
                    this.filterForm.controls["startDate"].value == ""
                        ? null
                        : this.fixDate(
                              this.filterForm.controls["startDate"].value
                          );
                request.endDate =
                    this.filterForm.controls["endDate"].value == ""
                        ? null
                        : this.fixDate(
                              this.filterForm.controls["endDate"].value
                          );
                this._loaderService.show();
                return this._reportsService.gantMonthlyReport(request);
            }),
            map((data) => {
                this._loaderService.hide();
                this.resultsLength = data.employeeMonthlyReport.length;
                this.publicHolidays = data.publicHolidays;
                return data.employeeMonthlyReport;
            }),
            catchError(() => {
                this._loaderService.hide();
                return observableOf([]);
            })
        );
    }

    fixDate(date) {
        date = new Date(date);
        let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
        let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
        date.setHours(hoursDiff);
        date.setMinutes(minutesDiff);
        return date;
    }
    getEmployeValue(data: any) {
        this.getId = data;
        this.getLeaveList();
    }
}
