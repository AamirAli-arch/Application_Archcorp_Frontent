import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { ExpectedIncome, FinancialReport } from "../modal/financial";
import { FinancialService } from "../service/financial.service";


@Component({
  selector: 'app-add-expected-income',
  templateUrl: './add-expected-income.component.html',
  styleUrls: ['./add-expected-income.component.scss']
})
export class AddExpectedIncomeComponent implements OnInit {
    allocationForm: FormGroup;
    statDate: any;
    endDate: any;
    expenseTypeList = [];
    expenseDescriptionList = [];
    project_Id: any;
    getType: any;
    title:string;
    constructor(
        private fb: FormBuilder,
        private _messageNotification: MessageNotifierService,
        private dialogRef: MatDialogRef<AddExpectedIncomeComponent>,
        private _loaderService: LoaderSpinerService,
        private _services: FinancialService,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.getType = data.type;
    }

    ngOnInit(): void {
        this.allocationForm = this.fb.group({
            amount: ["", Validators.required],
            projectName: ["", Validators.required],
            date: ["", Validators.required],
        });
        if (this.getType != "add") {
            this.updateFrom();
            this.title="Update Expected Income"
        } else {
            this.title="Add Expected Income"
        }
    }

    updateFrom() {
        this.allocationForm.patchValue({
            amount: this.getType.amount,
            date:this.getType.date,
            projectName:this.getType.projectName
        });
    }
    numberOnly(event): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    onSubmit() {
        if (this.allocationForm.valid) {
            let request = new ExpectedIncome();
            request.amount = this.allocationForm.controls["amount"].value;
            request.projectName =this.allocationForm.controls["projectName"].value;
            request.date = this.fixDate(this.allocationForm.controls["date"].value);

            this._loaderService.show();
            if (this.getType != "add") {
                request.id= this.getType.id;
                this._services.updateExpectedIncome(request).subscribe(
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
                this._services.addExpectedIncome(request).subscribe(
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
