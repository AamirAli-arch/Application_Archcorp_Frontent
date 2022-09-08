import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import {
    FormGroup,
    FormBuilder,
    FormControl,
} from "@angular/forms";
import { ReportsService } from "../services/reports.service";
import {
    Employee,
    MonthlyReport,
    ReportsRequest,
} from "../models/reportsRequest";
import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

@Component({
    selector: "app-monthly-reports",
    templateUrl: "./monthly-reports.component.html",
    styleUrls: ["./monthly-reports.component.scss"],
})
export class MonthlyReportsComponent implements OnInit, AfterViewInit {
    moment = moment;
    displayedColumns = ["name", "workedHours", "allocatedHours"];
    dataSource: ReportsService | null;
    employees: Employee[];
    resultsLength = 0;
    filteredAndPaged: Observable<MonthlyReport[]>;

    filterForm: FormGroup;
    isLoadingResults = true;
    getId: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private fb: FormBuilder,
        private _reportsService: ReportsService,
        private _httpClient: HttpClient
    ) {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getMonthlyList();
        });
    }
    getMonthlyList() {
        this.dataSource = new ReportsService(this._httpClient);

        this.filteredAndPaged = merge(
            this.paginator.page,
            this.filterForm.get("startDate").valueChanges,
            this.filterForm.get("endDate").valueChanges
        ).pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                const request = new ReportsRequest();
                request.currentPage = this.paginator.pageIndex + 1;
                request.pageSize = this.paginator.pageSize;
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
                return this._reportsService.getMonthlyReport(request);
            }),
            map((data) => {
                this.isLoadingResults = false;
                this.resultsLength = data.totalCount;
                return data.emplyeeWorkHours;
            }),
            catchError(() => {
                this.isLoadingResults = false;
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

    getRecord(row) {
       
    }

    ngOnInit(): void {
        this.filterForm = this.fb.group({
            startDate: new FormControl(""),
            endDate: new FormControl(""),
        });
    }
    getEmployeValue(data: any) {
        this.getId = data;
        this.getMonthlyList();
    }
}
