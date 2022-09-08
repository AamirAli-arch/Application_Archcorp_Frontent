import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import {
    FormGroup,
    FormBuilder,
    FormControl,
} from "@angular/forms";


import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";

import * as Moment from "moment";
import { extendMoment } from "moment-range";
import { Employee } from "app/main/charts/chart/services/ApiServices";

import { FinancialService } from "../service/financial.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ExpectedIncome, ExpensePaginationRequest } from "../modal/financial";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { DeletePopupComponent } from "../../delete-popup/delete-popup.component";
import { AddExpectedIncomeComponent } from "../add-expected-income/add-expected-income.component";
const moment = extendMoment(Moment);

@Component({
  selector: 'app-expected-income-pagination',
  templateUrl: './expected-income-pagination.component.html',
  styleUrls: ['./expected-income-pagination.component.scss']
})
export class ExpectedIncomePaginationComponent implements OnInit {

    moment = moment;
    displayedColumns = ["name","income", "month", "actions"];
    dataSource;
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
        private _services: FinancialService,  private _messageNotification: MessageNotifierService,
    ) {

    }

    ngOnInit(): void {
        this.filterForm = this.fb.group({
            years: new FormControl(""),
            projectName: new FormControl(""),
        });

    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getExpectedIncomeList();
        });
    }

    applyFilter(filterText: string) {
        this.getExpectedIncomeList();
      }
    getExpectedIncomeList() {
        this.filteredAndPaged = merge(
            this.paginator.page,
            this.filterForm.get("years").valueChanges,
            this.filterForm.get("projectName").valueChanges,
        ).pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                this._loaderService.show();
                const request = new ExpectedIncome();
                request.currentPage = this.paginator.pageIndex + 1;
                request.pageSize = this.paginator.pageSize;
                request.searchTerm=  this.filterForm.controls["projectName"].value
                request.date =  this.filterForm.controls["years"].value
                return this._services.getExpectedIncomeList(request);
            }),
            map((data) => {
                this._loaderService.hide();
                this.resultsLength = data.totalCount;
                this.dataSource=data.expectedIncomes;
                return data.expectedIncomes;
            }),
            catchError(() => {
                this.isLoadingResults = false;
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


    addrecord(type) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {type};
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.panelClass = "addType";
        const dialogRef = this.dialog.open(
            AddExpectedIncomeComponent,
            dialogConfig
        );
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                    this.getExpectedIncomeList();
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
                const request = new ExpectedIncome();
                request.id=id;
                this._services.deleteExpectedIncome(request).subscribe(
                    (response) => {
                        if (response.errorMessage == null) {
                            this._loaderService.hide();
                            this.getExpectedIncomeList();
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
