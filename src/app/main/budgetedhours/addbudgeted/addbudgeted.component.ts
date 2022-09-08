import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddScopeComponent } from 'app/main/award-project/add-scope/add-scope.component';
import { AddScopeRequest } from 'app/main/award-project/modal/award-modal';
import { AwardservicesService } from 'app/main/award-project/services/awardservices.service';
import { EmployeeService } from 'app/main/pages/employee-record/services/employee.service';
import { LoaderSpinerService } from 'app/main/pages/loader-spiner/loader-spiner.service';
import { MessageNotifierService } from 'app/services/message-notifier.service';
import { AddBudgetRequest } from '../modal/budgeted';
import { BudgetedService } from '../services/budgeted.service';

@Component({
  selector: 'app-addbudgeted',
  templateUrl: './addbudgeted.component.html',
  styleUrls: ['./addbudgeted.component.scss']
})
export class AddbudgetedComponent implements OnInit {

    addBudgetForm: FormGroup;
    statDate: any;
    endDate: any;
    projectArray: any = [];
    projectId: any;
    degisationList: any;
    addUpdate:any;
    cardId:number;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _messageNotification: MessageNotifierService,
        private _services: EmployeeService,
        private _servicesBudgete: BudgetedService,
        private _loaderService: LoaderSpinerService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddScopeComponent>,

    ) {

        this.projectId = data.projectId;
        this.addUpdate=data.cardData;
        this.cardId= this.addUpdate.id;
      //  console.log('card', this.cardId, this.addUpdate);
        
    }

    ngOnInit(): void {
        this.addBudgetForm = this.fb.group({
            designation: new FormControl(),
            hours: new FormControl()
        });
        if(this.addUpdate!='add'){
            this.addBudgetForm.patchValue({
                designation: this.addUpdate.designationId,
                hours: this.addUpdate.budgetedHours
            });
        }
    

        this._services.getDesignationsList().subscribe((response: any) => {
            if (response) {
                this.degisationList = response.designations;
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
        if (this.addBudgetForm.valid) {
            let request = new AddBudgetRequest();
            request.designationId = this.addBudgetForm.controls['designation'].value;
            request.budgetedHours = this.addBudgetForm.controls['hours'].value;
            request.projectId=this.projectId;
            this._loaderService.show();
            if(this.addUpdate=='add'){
            this._servicesBudgete.addBudgete(request).subscribe(
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
        } else{
            //console.log('update');
            request.id=this.cardId
            this._servicesBudgete.updateBudgete(request).subscribe(
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
}