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
import { FinancialService } from "../service/financial.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AddExpenseComponent } from "../add-expense/add-expense.component";
import { ExpensePaginationRequest, FinancialReport } from "../modal/financial";
import { AddDescriptionTypeComponent } from "../add-description-type/add-description-type.component";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { DeletePopupComponent } from "../../delete-popup/delete-popup.component";
const moment = extendMoment(Moment);

@Component({
  selector: 'app-expense-table-pagination',
  templateUrl: './expense-table-pagination.component.html',
  styleUrls: ['./expense-table-pagination.component.scss']
})
export class ExpenseTablePaginationComponent implements OnInit {

    moment = moment;
    displayedColumns = ["name","description", "income", "month", "actions"];
    dataSource:  | null;
    employees: Employee[];
    resultsLength = 0;
    filteredAndPaged: Observable<ExpensePaginationRequest[]>;

    filterForm: FormGroup;
    isLoadingResults = true;
    getId: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    expenseTypeList: any;
    expenseDescriptionList: any;

    constructor(
        private fb: FormBuilder,public dialog: MatDialog,  private _loaderService: LoaderSpinerService,
        private _httpClient: HttpClient, private _services: FinancialService,  private _messageNotification: MessageNotifierService,
    ) {

    }

    ngOnInit(): void {
        this.filterForm = this.fb.group({
            startDate: new FormControl(""),
            endDate: new FormControl(""),
            expenseTypeId:new FormControl(""),
            expenseDescriptionId:new FormControl(""),
        });
        this._services.getExpenseTypeList().subscribe((response: any) => {
            if (response) {
                this.expenseTypeList = response.expenseTypes;
            }
        });
        this.filterForm
        .get("expenseTypeId")
        .valueChanges.subscribe((id: any) => {
            if (id) {
                this._services
                    .getExpenseDescription(id)
                    .subscribe((response: any) => {
                        this.expenseDescriptionList =
                            response.expenseDescriptions;
                    });
            }
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getExpenseList();
        });
    }
    getExpenseList() {

        this.filteredAndPaged = merge(
            this.paginator.page,
            this.filterForm.get("startDate").valueChanges,
            this.filterForm.get("endDate").valueChanges,
            this.filterForm.get("expenseTypeId").valueChanges,
            this.filterForm.get("expenseDescriptionId").valueChanges
        ).pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                const request = new ExpensePaginationRequest();
                request.currentPage = this.paginator.pageIndex + 1;
                request.pageSize = this.paginator.pageSize;
                request.type =   this.filterForm.controls["expenseTypeId"].value =="" ? 0: this.filterForm.controls["expenseTypeId"].value ;
                request.description = this.filterForm.controls["expenseDescriptionId"].value =="" ? 0 : this.filterForm.controls["expenseDescriptionId"].value;
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
                return this._services.getExpenseListPagination(request);
            }),
            map((data) => {
                this.isLoadingResults = false;
                this.resultsLength = data.totalCount;
                return data.expenses;
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

   
    addrecord(type) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {type};
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.panelClass = "addType";
        const dialogRef = this.dialog.open(
            AddExpenseComponent,
            dialogConfig
        );
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                    this.getExpenseList();
                }
            }
        });
    }

    addTypeDescription(buttonType) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {buttonType};
        dialogConfig.panelClass = "addType";
        const dialogRef = this.dialog.open(
            AddDescriptionTypeComponent,
            dialogConfig
        );
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                    this.getExpenseList();
                }
            }
        });
    }

    deleteExp(id:any){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.panelClass = "delete-modal";
        const dialogRef = this.dialog.open(
            DeletePopupComponent,
            dialogConfig
        );
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                const request = new FinancialReport();
                request.id=id;
                this._services.deleteExpense(request).subscribe(
                    (response) => {
                        if (response.errorMessage == null) {
                            this._loaderService.hide();
                            this.getExpenseList();
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
