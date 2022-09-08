import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { AddExpenseType } from "../modal/financial";
import { FinancialService } from "../service/financial.service";

@Component({
    selector: "app-add-description-type",
    templateUrl: "./add-description-type.component.html",
    styleUrls: ["./add-description-type.component.scss"],
})
export class AddDescriptionTypeComponent implements OnInit {
    allocationForm: FormGroup;
    statDate: any;
    endDate: any;
    expenseTypeList = [];
    expenseDescriptionList = [];
    project_Id: any;
    title: string;
    hideshow: boolean = false;
    getbuttonType: any;
    constructor(
        private fb: FormBuilder,
        private _messageNotification: MessageNotifierService,
        private dialogRef: MatDialogRef<AddDescriptionTypeComponent>,
        private _loaderService: LoaderSpinerService,
        private _services: FinancialService,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.getbuttonType = data.buttonType;
    }

    ngOnInit(): void {
        this.allocationForm = this.fb.group({
            expensetext: [""],
            expenseTypeId: [""],
            expenseDescriptionId: [""],
        });
        if (this.getbuttonType == "Type") {
            this.title = "Add Type";
            this.hideshow = true;
            this.allocationForm
                .get("expensetext")
                .setValidators(Validators.required);
        } else {
            this.title = "Add Description";
            this.hideshow = false;
            this.allocationForm
                .get("expenseTypeId")
                .setValidators(Validators.required);
            this.allocationForm
                .get("expenseDescriptionId")
                .setValidators(Validators.required);
        }
        this._services.getExpenseTypeList().subscribe((response: any) => {
            if (response) {
                this.expenseTypeList = response.expenseTypes;
            }
        });
        this.allocationForm
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

    onSubmit() {
        if (this.allocationForm.valid) {
            const request = new AddExpenseType();
            request.name = this.allocationForm.controls["expensetext"].value;         
            this._loaderService.show();
            if (this.getbuttonType == "Type") {
                this._services.addExpenseType(request).subscribe(
                    (response) => {
                        if (response.errorMessage == null) {
                            this._loaderService.hide();
                            this.dialogRef.close(response);
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
            } else {
                const request = new AddExpenseType();
                request.expenseTypeId = this.allocationForm.controls["expenseTypeId"].value;
                request.name = this.allocationForm.controls["expenseDescriptionId"].value;
                this._services.addDescriptionType(request).subscribe(
                    (response) => {
                        if (response.errorMessage == null) {
                            this._loaderService.hide();
                            this.dialogRef.close(response);
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
        }
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
