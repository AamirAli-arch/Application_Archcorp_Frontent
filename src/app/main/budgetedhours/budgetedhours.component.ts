import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { identity } from "lodash/fp";
import { DeletePopupComponent } from "../pages/delete-popup/delete-popup.component";
import { LoaderSpinerService } from "../pages/loader-spiner/loader-spiner.service";
import { AddbudgetedComponent } from "./addbudgeted/addbudgeted.component";
import { AddBudgetRequest } from "./modal/budgeted";
import { BudgetedService } from "./services/budgeted.service";

@Component({
    selector: "app-budgetedhours",
    templateUrl: "./budgetedhours.component.html",
    styleUrls: ["./budgetedhours.component.scss"],
})
export class BudgetedhoursComponent implements OnInit {
    projectId: any;
    budgetedHoursArray: [];
    projectHours:number;
    constructor(
        private _messageNotification: MessageNotifierService,
        private _loaderService: LoaderSpinerService,
        private _servicesBudgete: BudgetedService,
        public dialog: MatDialog,
        private _Activatedroute: ActivatedRoute
    ) {
        this.projectId = this._Activatedroute.snapshot.paramMap.get("id");
        // this.projectId=1
    }

    ngOnInit(): void {
        this.getBudgeteList();
    }

    getBudgeteList() {
        let request = new AddBudgetRequest();
        request.projectId = this.projectId;
        this._loaderService.show();
        this._servicesBudgete.getBudgeteList(request).subscribe(
            (response: any) => {
                //   console.log('response', response)
                if (response) {
                    this.projectHours=0;
                    this._loaderService.hide();
                    this.budgetedHoursArray = response.budgetedHours;
                    this.budgetedHoursArray.forEach((element:any) => {
                        this.projectHours+=element.budgetedHours;
                    });
                    console.log("this.budgetedHours", this.budgetedHoursArray);
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

    addUpdateBudgete(cardData) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {};
        dialogConfig.data = {
            projectId: this.projectId,
            cardData: cardData,
        };
        dialogConfig.panelClass = "taskallocation";
        const dialogRef = this.dialog.open(AddbudgetedComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                    this.getBudgeteList();
                }
            }
        });
    }

    deleteCard(deleteId) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.panelClass = "delete-modal";
        const dialogRef = this.dialog.open(DeletePopupComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this._servicesBudgete.deleteBudgete(deleteId).subscribe(
                    (respose: any) => {
                        if (respose.errorMessage == null) {
                            this.getBudgeteList();
                            this._messageNotification.successMessage(
                                respose.successMessage
                            );
                        }
                    },
                    (error) => {
                        this._messageNotification.errorMessage(
                            error.error.errorMessage
                        );
                    }
                );
            }
        });
    }
}
