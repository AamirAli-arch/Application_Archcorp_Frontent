import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Color, BaseChartDirective, Label } from "ng2-charts";
import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { NotificationRequest } from "../../notification/models/notification";
import { NotificationService } from "../../notification/services/notification.service";
import { Employee } from "../../reports/models/reportsRequest";
import { ReportsService } from "../../reports/services/reports.service";
import {
    EmployeeLeaveRequest,
    EmployeeLeaves,
} from "../models/leave-application";
import { LeaveService } from "../services/leave.service";

@Component({
    selector: "app-leave-summary",
    templateUrl: "./leave-summary.component.html",
    styleUrls: ["./leave-summary.component.scss"],
})
export class LeaveSummaryComponent implements OnInit, AfterViewInit {
    public lineChartData: ChartDataSets[] = [
        { data: [65, 59, 0, 81, 56, 55, 0], label: "Leaves Request" },
        { data: [20, 45, 0, 30, 0, 10], label: "Approved Request" },
    ];
    public lineChartLabels: Label[] = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
    ];
    public lineChartOptions: ChartOptions = {
        responsive: true,
        scales: {
            // We use this empty structure as a placeholder for dynamic theming.
            xAxes: [{}],
            yAxes: [
                {
                    id: "y-axis-0",
                    position: "left",
                },
            ],
        },
    };
    public lineChartColors: Color[] = [
        {
            // red
            backgroundColor: "rgb(79,156,230)",
            borderColor: "rgb(79,156,230)",
            pointBackgroundColor: "rgba(148,159,177,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(148,159,177,0.8)",
        },
        {
            // red
            backgroundColor: "green",
            borderColor: "green",
            pointBackgroundColor: "green",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "green",
        },
    ];
    public lineChartLegend = true;
    public lineChartType: ChartType = "line";

    //Leave Request Table Data
    displayedColumns = [
        "empName",
        "createdDate",
        "leaveType",
        "startDate",
        "endDate",
        "noOfDays",
        "startingHalf",
        "endingHalf",
        "currentStatus",
        "actions",
    ];
    dataSource: LeaveService | null;
    employees: Employee[];
    resultsLength = 0;
    filteredAndPaged: Observable<EmployeeLeaves[]>;

    filterForm: FormGroup;
    isLoadingResults = true;
    getNotificationId: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
    private _notificationSub;
    getId:any;
    statusArray;
    constructor(
        private fb: FormBuilder,
        private _Activatedroute: ActivatedRoute,
        private _httpClient: HttpClient,
        private _leaveService: LeaveService,
        private _reportsService: ReportsService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _notificationService: NotificationService, private _loaderService:LoaderSpinerService
    ) {}
    ngOnInit(): void {
        this.filterForm = this.fb.group({
            name: new FormControl([]),
            startDate: new FormControl(""),
            endDate: new FormControl(""),
            status: new FormControl(""),
        });

        this._reportsService.getEmployees().subscribe((response) => {
            this.employees = response.employees;
        });
        this.statusArray=this._leaveService.leaveArray;
    }

    ngAfterViewInit(): void {
        // Mark as read notfication
        this._notificationSub =
            this._notificationService.getnotificationcount.subscribe(
                (notficationId: any) => {
                    if (notficationId) {
                        const request = new NotificationRequest();
                        request.id = notficationId;
                        this._notificationService
                            .markNotificationViewed(request)
                            .subscribe((response: any) => {
                                if (response) {
                                    this._notificationService.updateCount("");
                                }
                            });
                    }
                }
            );
        setTimeout(() => {
            // call API first time
            this.getEmployesList();
        });
    }
    getEmployesList() {
        this.dataSource = new LeaveService(this._httpClient);

        this.filteredAndPaged = merge(
            this.paginator.page,
            this.filterForm.get("startDate").valueChanges,
            this.filterForm.get("endDate").valueChanges,
            this.filterForm.get("status").valueChanges,
        ).pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                const request = new EmployeeLeaveRequest();
                request.currentPage = this.paginator.pageIndex + 1;
                request.pageSize = this.paginator.pageSize;
                request.employeeIds =  this.getId;
                request.status= this.filterForm.controls["status"].value=="" ? 0: this.filterForm.controls["status"].value;
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
                          this._loaderService.show()
                return this._leaveService.getEmployeeLeaveRequest(request);
            }),
            map((data) => {
                this._loaderService.hide()
                this.resultsLength = data.totalCount;
                this._notificationService.updateCount("");
                return data.employeeLeaves;
            }),
            catchError(() => {
                this._loaderService.hide()
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

    getDetails(id) {
        this.router.navigate(["/pages/leave-details/" + id]);
    }
    ngOnDestroy() {
        this._notificationSub.unsubscribe();
    }
    getEmployeValue(data:any){
        this.getId=data;
        this.getEmployesList();
      }
}
