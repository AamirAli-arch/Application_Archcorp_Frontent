import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeRecordEditComponent } from 'app/main/pages/employee-record/employee-record-edit/employee-record-edit.component';
import { LoaderSpinerService } from 'app/main/pages/loader-spiner/loader-spiner.service';
import { MessageNotifierService } from 'app/services/message-notifier.service';
import { AddStage, SubmissionPlan } from '../../services/modal/submission';
import { SubmissionService } from '../../services/submission.service';

@Component({
  selector: 'app-add-stage',
  templateUrl: './add-stage.component.html',
  styleUrls: ['./add-stage.component.scss']
})
export class AddStageComponent implements OnInit {
    addAuthForm: FormGroup;
    statDate: any;
    endDate: any;
    departmentArray = [{ name: "", value: "" }];
    projectArray: any = [];
    stageArray: any = [];
    authorityArray: any = [];
    masterArray: any = [];
    submissionId: number;
    getEmployee: any;
    emirateArray = [
        { name: "Dubai", id: 1 },
        { name: "Sharjah", id: 2 },
        { name: "Abu Dhabi", id: 3 },
        { name: "Ajman", id: 4 },
        { name: "Ras Al Khaima", id: 5 },
        { name: "Um Al Quwain", id: 6 },
        { name: "Fujaira", id: 7 },
    ];
    statusArray = [
        { name: "Submitted", value: 2 },
        { name: "Rejected", value: 3 },
        { name: "Resubmitted", value: 4 },
        { name: "Approved", value: 5 },
    ];
    constructor(
        private _service: SubmissionService,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<EmployeeRecordEditComponent>,
        private _messageNotification: MessageNotifierService,
        private _loaderService: LoaderSpinerService
    ) {
        console.log("project Id", data);
        this.submissionId = data.id;
        console.log("project Id", this.submissionId);
    }

    ngOnInit(): void {
        this.addAuthForm = this.fb.group({
            status: new FormControl(""),
            remark: new FormControl(""),
            planDate: new FormControl(""),
            comment: new FormControl(""),
            validity: new FormControl(""),
        });
        // set the filed required base on condition
        this.addAuthForm.controls["status"].valueChanges.subscribe(
            (response: any) => {
                if(response==5){
                    this.addAuthForm.get("validity").setValidators(Validators.required);
                    this.addAuthForm.get("validity").updateValueAndValidity();
                } else if(response==3){
                    this.addAuthForm.get("planDate").setValidators(Validators.required);
                    this.addAuthForm.get("planDate").updateValueAndValidity();

                } else{
                    this.addAuthForm.get("validity").clearValidators();
                    this.addAuthForm.get("validity").updateValueAndValidity();
                    this.addAuthForm.get("planDate").clearValidators();
                    this.addAuthForm.get("planDate").updateValueAndValidity();
                }
        })


    }
    getEmployeValue(data: any) {
        this.getEmployee = data;
    }

    fixDate(date) {
        date = new Date(date);
        let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
        let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
        date.setHours(hoursDiff);
        date.setMinutes(minutesDiff);
        return date;
    }

    onSubmit() {
        if(this.addAuthForm.valid){
            let request = new AddStage();
            request.submissionId= this.submissionId;
            request.status = this.addAuthForm.controls["status"].value;
            request.remarks= this.addAuthForm.controls['remark'].value;
            request.date= this.fixDate(this.addAuthForm.controls['planDate'].value);
            request.validity= this.addAuthForm.controls['validity'].value;
            request.comments = this.addAuthForm.controls["comment"].value;
            this._loaderService.show();

            this._service.addStage(request).subscribe(
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
