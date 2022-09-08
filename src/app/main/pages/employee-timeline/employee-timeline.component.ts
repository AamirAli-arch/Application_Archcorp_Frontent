import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";

import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import {
    EmpCheckAttendance,
    Employee,
    ReportsRequest,
} from "../reports/models/reportsRequest";
import { LoaderSpinerService } from "../loader-spiner/loader-spiner.service";
import { TimelineService } from "./services/timeline.service";
import { TimeLineRequest } from "./model/timeline";
const moment = extendMoment(Moment);

@Component({
    selector: "app-employee-timeline",
    templateUrl: "./employee-timeline.component.html",
    styleUrls: ["./employee-timeline.component.scss"],
})
export class EmployeeTimelineComponent implements OnInit {
    moment = moment;
    
    displayedColumns = [
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
    dataSource: TimelineService | null;
    employees: Employee[];
    resultsLength = 0;
    filteredAndPaged: Observable<EmpCheckAttendance[]>;
    project_Id:any;
    filterForm: FormGroup;
    isLoadingResults = true;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private _loaderService: LoaderSpinerService,
        private fb: FormBuilder,
        private _service: TimelineService,
        private _httpClient: HttpClient
    ) {}

    ngOnInit(): void {
        this.filterForm = this.fb.group({
            startDate: new FormControl(""),
            endDate: new FormControl(""),
        });
    }
    projectId(Id:any){
        this.project_Id=Id;
        this.getEmployeeTimeLineList();
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getEmployeeTimeLineList();
        });
    }
    getEmployeeTimeLineList(){
        this.filteredAndPaged = merge(
            this.paginator.page,
            this.filterForm.get("startDate").valueChanges,
            this.filterForm.get("endDate").valueChanges
        ).pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                const request = new TimeLineRequest();
                request.currentPage = this.paginator.pageIndex + 1;
                request.pageSize = this.paginator.pageSize;
                request.projectIds= this.project_Id;
                //   request.employeeIds = this.filterForm.controls['name'].value;
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
                return this._service.getEmployeeTimeLine(request);
            }),
            map((data) => {
                this._loaderService.hide();
                this.resultsLength = data.totalCount;
                return data.employeeTimeline;
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
}
