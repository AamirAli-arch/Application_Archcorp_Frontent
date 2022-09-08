import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import {
    FormGroup,
    FormBuilder,
    FormControl,
} from "@angular/forms";


import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import { Employee } from "app/main/charts/chart/services/ApiServices";
import { MonthlyReport } from "../../reports/models/reportsRequest";
import { ReportsService } from "../../reports/services/reports.service";
import { ExpensePaginationRequest, FinancialReport } from "../modal/financial";
import { FinancialService } from "../service/financial.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AddIncomeComponent } from "../add-income/add-income.component";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { DeletePopupComponent } from "../../delete-popup/delete-popup.component";
const moment = extendMoment(Moment);


@Component({
  selector: 'app-income-table-pagination',
  templateUrl: './income-table-pagination.component.html',
  styleUrls: ['./income-table-pagination.component.scss']
})
export class IncomeTablePaginationComponent implements OnInit {

    noRecords=false;
    moment = moment;
    displayedColumns = ["name","stage", "income", "month", "actions"];
    dataSource: ReportsService | null;
    employees: Employee[];
    resultsLength = 0;
    filteredAndPaged: Observable<MonthlyReport[]>;

    filterForm: FormGroup;
    isLoadingResults = true;
    getId: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    project_Id: any;

    constructor(
        private fb: FormBuilder,public dialog: MatDialog,  private _loaderService: LoaderSpinerService,
        private _httpClient: HttpClient, private _services: FinancialService,  private _messageNotification: MessageNotifierService,
    ) {}
    ngOnInit(): void {
        this.filterForm = this.fb.group({
            startDate: new FormControl(""),
            endDate: new FormControl(""),
        });
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getIncomeList();
        });
    }
    projectId(Id:any){
        this.project_Id=Id;
        this.getIncomeList();
    }
    getIncomeList() {

        this.filteredAndPaged = merge(
            this.paginator.page,
            this.filterForm.get("startDate").valueChanges,
            this.filterForm.get("endDate").valueChanges
        ).pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                //this.noRecords=true;
                const request = new ExpensePaginationRequest();
                request.currentPage = this.paginator.pageIndex + 1;
                request.pageSize = this.paginator.pageSize;
                request.projectIds = this.project_Id;
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
                return this._services.getIncomeListPagination(request);
            }),
            map((data) => {
                this.isLoadingResults = false;
                this.noRecords=false;
                this.resultsLength = data.totalCount;
                return data.incomes;
            }),
            catchError(() => {
                this.isLoadingResults = false;
                this.noRecords=true;
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


    addrecord(type) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {type};
        dialogConfig.panelClass = "addType";

        const dialogRef = this.dialog.open(
            AddIncomeComponent,
            dialogConfig
        );
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                    this.getIncomeList();
                }
            }
        });
    }
    deleteIn(id:any){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        // dialogConfig.data = {id, Type:'Income'};
        dialogConfig.panelClass = "delete-modal";
        const dialogRef = this.dialog.open(
            DeletePopupComponent,
            dialogConfig
        );
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                const request = new FinancialReport();
                request.id=id;
                this._services.deleteIncome(request).subscribe(
                    (response) => {
                        if (response.errorMessage == null) {
                            this._loaderService.hide();
                            this.getIncomeList();
                            this._messageNotification.successMessage(
                                response.successMessage
                            );
                        }
                    },
                    (error) => {
                        this._loaderService.hide();
                        this._messageNotification.errorMessage(
                            error.error.errorMessage
                        );
                    }
                );
            }
        });
    }

}
