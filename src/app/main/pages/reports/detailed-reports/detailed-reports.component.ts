import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import {
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,
    FormControl,
    Validators,
} from "@angular/forms";
import { ReportsService } from "../services/reports.service";
import {
    EmpAttendance,
    EmpCheckAttendance,
    Employee,
    ReportsRequest,
    ReportsResponse,
} from "../models/reportsRequest";
import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ReportTimeupdateComponent } from "../report-timeupdate/report-timeupdate.component";
import { MessageNotifierService } from "app/services/message-notifier.service";
const moment = extendMoment(Moment);

@Component({
    selector: "app-detailed-reports",
    templateUrl: "./detailed-reports.component.html",
    styleUrls: ["./detailed-reports.component.scss"],
})
export class DetailedReportsComponent implements OnInit, AfterViewInit {
    moment = moment;
    displayedColumns = [
        "name",
        "projectName",
        "taskName",
        "checkIn",
        "checkOut",
        "minutes",
        "date",
        "checkInLocDiff",
        "checkOutLocDiff",
        "checkInNotes",
        "checkOutNotes",
    ];
    dataSource: ReportsService | null;
    employees: Employee[];
    resultsLength = 0;
    filteredAndPaged: Observable<EmpCheckAttendance[]>;
    getId: any;
    filterForm: FormGroup;
    isLoadingResults = true;
    todayTime= new Date();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    project_Id: any;

    constructor(
        public dialog: MatDialog,
        private _loaderService: LoaderSpinerService,
        private fb: FormBuilder,
        private _reportsService: ReportsService,
        private _httpClient: HttpClient,private _messageNotification:MessageNotifierService
    ) {

    }

    ngOnInit(): void {
        this.filterForm = this.fb.group({
            name: new FormControl([]),
            startDate: new FormControl(""),
            endDate: new FormControl(""),
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getReportList();
        });
    }
    getReportList() {
     
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
                request.projectIds =  this.project_Id;
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
                return this._reportsService.getDetailedReportsData(request);
            }),
            map((data) => {
                this._loaderService.hide();
                this.resultsLength = data.totalCount;
                return data.employeeCheckInOutDetails;
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

    editTime(time) {
        if(moment(time.checkIn).format("HH:mm") > '07:59' && moment(time.checkIn).format("HH:mm") < '23:59'){
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.data = { time };
            // dialogConfig.panelClass="taskallocation"
            const dialogRef = this.dialog.open(
                ReportTimeupdateComponent,
                dialogConfig
            );
            dialogRef.afterClosed().subscribe((data) => {
                if(data){
                    if (data.errorMessage == null) {
                        this.getReportList();
                    }
                }
            });
        }
    }
    getEmployeValue(data: any) {
        this.getId = data;
        this.getReportList();
    }

    projectId(Id:any){
        this.project_Id=Id;
        this.getReportList();
    }
  

}
