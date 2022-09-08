import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {
    MatDialogRef,
    MatDialog,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EmployeeRecordEditComponent } from "app/main/pages/employee-record/employee-record-edit/employee-record-edit.component";
import { LoaderSpinerService } from "app/main/pages/loader-spiner/loader-spiner.service";
import { ResourceService } from "app/main/pages/site-projection/service/resource.service";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { title } from "process";
import { SubmissionPlan } from "../../services/modal/submission";
import { SubmissionService } from "../../services/submission.service";

@Component({
    selector: "app-add-auth",
    templateUrl: "./add-auth.component.html",
    styleUrls: ["./add-auth.component.scss"],
})
export class AddAuthComponent implements OnInit {
    addAuthForm: FormGroup;
    statDate: any;
    endDate: any;
    departmentArray = [{ name: "", value: "" }];
    projectArray: any = [];
    stageArray: any = [];
    authorityArray: any = [];
    masterArray: any = [];
    projectId: number;
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
    constructor(
        private _service: SubmissionService,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<EmployeeRecordEditComponent>,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _messageNotification: MessageNotifierService,
        private _loaderService: LoaderSpinerService
    ) {
        console.log("project Id", data);
        this.projectId = data.id;
        console.log("project Id", this.projectId);
    }

    ngOnInit(): void {
        this.addAuthForm = this.fb.group({
            stage: new FormControl(""),
            authority: new FormControl(""),
            //masterId: new FormControl(""),
            planDate: new FormControl(""),
            title: new FormControl(""),
            comment: new FormControl(""),
            discription: new FormControl(""),
           // emirate: new FormControl(""),
        });

        // get Stage List
        this._service.getStageList().subscribe(
            (response: any) => {
                if (response) {
                    this.stageArray = response.stages;
                }
            },
            (error) => {
                this._messageNotification.errorMessage(
                    error.error.errorMessage
                );
                //console.log("error", error);
            }
        );
        // get Authority List
        this._service.getAuthorityList().subscribe(
        (response: any) => {
            if (response) {
                this.authorityArray = response.authorities;
            }
        },
        (error) => {
            this._messageNotification.errorMessage(
                error.error.errorMessage
            );
            //console.log("error", error);
        }
    );

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
        if (this.addAuthForm.valid) {
            let request = new SubmissionPlan();
            request.title = this.addAuthForm.controls["title"].value;
            request.stageId = this.addAuthForm.controls["stage"].value;
            request.submittedTo = this.addAuthForm.controls["authority"].value;
            request.plannedDate = this.fixDate(
                this.addAuthForm.controls["planDate"].value
            );
            request.description =
                this.addAuthForm.controls["discription"].value;
            request.responsibleResources = this.getEmployee;
            request.projectId = this.projectId;
            request.comments = this.addAuthForm.controls["comment"].value;
            this._loaderService.show();
            this._service.addSubmission(request).subscribe(
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
