import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageNotifierService } from 'app/services/message-notifier.service';
import { LoaderSpinerService } from '../../loader-spiner/loader-spiner.service';
import { AddIncomeRequest } from '../modal/financial';
import { FinancialService } from '../service/financial.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent implements OnInit {
    allocationForm: FormGroup;
    statDate: any;
    endDate: any;
    project_Id: any;
    stageList=[];
    stageHide:boolean=false;
    getType: any;
    title:string;
    projectName:any;
    isMultipleCheckbox:boolean=false;
    incomeType=[
        {name:"Confirmed", id:1},
        {name:"Low Risk", id:2},
        {name:"High Risk ", id:3}
    ]
    constructor(
        private fb: FormBuilder,
        private _messageNotification: MessageNotifierService,
        private dialogRef: MatDialogRef<AddIncomeComponent>,
        private _loaderService: LoaderSpinerService,
        private _services: FinancialService, @Inject(MAT_DIALOG_DATA) data
    ) {
        this.getType = data.type;
    }

    ngOnInit(): void {
        this.allocationForm = this.fb.group({
            amount: ["", Validators.required],
            stage: ["", Validators.required],
            date: ["", Validators.required],
            endDate: ["",],
            incomeType: ["", Validators.required],
        });
        if (this.getType != "add") {
            this.updateFrom();
            this.title="Update Income"
        } else{
            this.title="Add Income"
        }
    }
    updateFrom(){
        this.allocationForm = this.fb.group({
            amount: [this.getType.amount, Validators.required],
            stage: [this.getType.stage, Validators.required],
            date: [this.getType.date, Validators.required],
            incomeType: [this.getType.incomeType, Validators.required],
        });
        this.projectName=this.getType.projectName;
        //this.projectName.emit(this.getType.projectName);
    }
    onOptionsSelected(value){
        if(value == 'others'){
            this.stageHide=false;
            this.allocationForm.controls["stage"].setValue('')
        } else{
            this.stageHide=true;
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
   numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
    projectId(id:any){
        this.project_Id=id;
        const request = new AddIncomeRequest();
        request.projectId = this.project_Id;
        this._services.getProjectIncomeStages(request).subscribe((response: any) => {
            if(response){
                this.stageList =response.stages;
                if(this.stageList.length>0){
                    this.stageHide=true;
                    this.stageList.push('others')
                } else{
                    this.stageHide=false;
                }
            }
        });
    }
    onSubmit() {
        if (this.allocationForm.valid) {
            let request = new AddIncomeRequest();
            request.amount = this.allocationForm.controls["amount"].value;
            request.projectId = this.project_Id;
            request.stage= this.allocationForm.controls["stage"].value;
            request.incomeType= this.allocationForm.controls["incomeType"].value;
            this._loaderService.show();
            if (this.getType != "add") {
                request.date= this.fixDate(this.allocationForm.controls["date"].value);
                request.id= this.getType.id;
                this._services.updateIncome(request).subscribe(
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
            request.isMultiple=this.isMultipleCheckbox;
            request.start= this.fixDate(this.allocationForm.controls["date"].value);
            request.end= this.fixDate(this.allocationForm.controls["endDate"].value);
            this._services.addIncome(request).subscribe(
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
