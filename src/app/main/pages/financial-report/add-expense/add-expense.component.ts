import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { data } from "jquery";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { FinancialReport } from "../modal/financial";
import { FinancialService } from "../service/financial.service";
import { update } from "lodash";
import { MatCheckboxChange } from "@angular/material/checkbox";

@Component({
    selector: "app-add-expense",
    templateUrl: "./add-expense.component.html",
    styleUrls: ["./add-expense.component.scss"],
})
export class AddExpenseComponent implements OnInit {
    allocationForm: FormGroup;
    statDate: any;
    endDate: any;
    expenseTypeList = [];
    expenseDescriptionList = [];
    project_Id: any;
    getType: any;
    title:string;
    isMultipleCheckbox:boolean=false;
    constructor(
        private fb: FormBuilder,
        private _messageNotification: MessageNotifierService,
        private dialogRef: MatDialogRef<AddExpenseComponent>,
        private _loaderService: LoaderSpinerService,
        private _services: FinancialService,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.getType = data.type;
    }

    ngOnInit(): void {
        this.allocationForm = this.fb.group({
            amount: ["", Validators.required],
            expenseTypeId: ["", Validators.required],
            expenseDescriptionId: ["", Validators.required],
            date: ["", Validators.required],
            endDate: ["",],
        });
        if (this.getType != "add") {
            this.updateFrom();
            this.title="Update Expense"
            this.expenseDescription();
        } else {
            this.title="Add Expense"
            this._services.getExpenseTypeList().subscribe((response: any) => {
                if (response) {
                    this.expenseTypeList = response.expenseTypes;
                }
            });
            this.expenseDescription();
        }
    }

    multipleDateSelect(event:MatCheckboxChange): void {
        if(event.checked==true){
            this.isMultipleCheckbox=event.checked;
            this.allocationForm.get("endDate").setValidators(Validators.required);
            this.allocationForm.get("endDate").updateValueAndValidity();
        } else{
            this.isMultipleCheckbox=event.checked;
            this.allocationForm.get("endDate").clearValidators();
            this.allocationForm.get("endDate").updateValueAndValidity();
        }
    }
    
    // check description value
    expenseDescription(){
        this.allocationForm
        .get("expenseTypeId")
        .valueChanges.subscribe((id: any) => {
            if (id) {
                this.allocationForm.patchValue({
                    expenseDescriptionId:'',
                });
                this._services
                    .getExpenseDescription(id)
                    .subscribe((response: any) => {
                        this.expenseDescriptionList =
                            response.expenseDescriptions;
                    });
            }
        });
    }
    updateFrom() {
        this.allocationForm.patchValue({
            amount: this.getType.amount,
            date:this.getType.date
        });
        this._services.getExpenseTypeList().subscribe((response: any) => {
            if (response) {
                this.expenseTypeList = response.expenseTypes;
                this.expenseTypeList.forEach((element) => {
                    if (element.name === this.getType.type) {
                        this.allocationForm.patchValue({
                            expenseTypeId: element.id,
                        });
                        this._services
                            .getExpenseDescription(element.id)
                            .subscribe((response: any) => {
                                this.expenseDescriptionList =
                                    response.expenseDescriptions;
                                this.expenseDescriptionList.forEach(
                                    (element) => {
                                        if (
                                            element.name ===
                                            this.getType.description
                                        ) {
                                            this.allocationForm.patchValue({
                                                expenseDescriptionId:
                                                    element.id,
                                            });
                                        }
                                    }
                                );
                            });

                    }
                });
            }
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
            let request = new FinancialReport();
            request.amount = this.allocationForm.controls["amount"].value;
            request.expenseTypeId =
                this.allocationForm.controls["expenseTypeId"].value;
            request.expenseDescriptionId =
                this.allocationForm.controls["expenseDescriptionId"].value;

            this._loaderService.show();
            if (this.getType != "add") {
                request.date = this.fixDate(
                    this.allocationForm.controls["date"].value
                );
                request.id= this.getType.id;
                this._services.updateExpense(request).subscribe(
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
                request.isMultiple=this.isMultipleCheckbox;
                request.start= this.fixDate(this.allocationForm.controls["date"].value);
                request.end= this.fixDate(this.allocationForm.controls["endDate"].value);
                this._services.addExpense(request).subscribe(
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
