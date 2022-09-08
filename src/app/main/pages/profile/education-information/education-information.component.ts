import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, FormArray } from "@angular/forms";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { educationInfomation } from "../models/profile";
import { ProfileService } from "../services/profile.service";

@Component({
    selector: "app-education-information",
    templateUrl: "./education-information.component.html",
    styleUrls: ["./education-information.component.scss"],
})
export class EducationInformationComponent implements OnInit {
    allocationForm: FormGroup;
    educationArray: FormArray;
    statDate: any;
    endDate: any;
    departmentArray = [{ name: "", value: "" }];
    getId: any = 1;
    constructor(
        private fb: FormBuilder,private _messageNotification:MessageNotifierService,
        private _loaderService: LoaderSpinerService,
        private dialogRef: MatDialogRef<EducationInformationComponent>,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _services: ProfileService
    ) {}

    ngOnInit(): void {
        this.allocationForm = this.fb.group({
            educationArray: this.fb.array([this.createItem()]),
        });
    }
    createItem() {
        return this.fb.group({
            institution: new FormControl(""),
            subject: new FormControl(""),
            startingDate: new FormControl(""),
            completeDate: new FormControl(""),
            degree: new FormControl(""),
            grade: new FormControl(""),
        });
    }

    addItem() {
        this.educationArray = this.allocationForm.get(
            "educationArray"
        ) as FormArray;
        this.educationArray.push(this.createItem());
    }

    deleteAddressGroup(index: number) {
        const add = this.allocationForm.get("educationArray") as FormArray;
        add.removeAt(index);
    }

    updateEducation() {
        if (this.allocationForm.valid) {
            let request = new educationInfomation();
            request.id = this.getId;
            request=this.allocationForm.controls["educationArray"].value
            // request.degree =
            //     this.allocationForm.controls["educationArray"].value[0].degree;
            // request.institution =
            //     this.allocationForm.controls[
            //         "educationArray"
            //     ].value[0].institution;
            // request.subject =
            //     this.allocationForm.controls["educationArray"].value[0].subject;
            // request.startDate = this.fixDate(
            //     this.allocationForm.controls["educationArray"].value[0]
            //         .startingDate
            // );
            // request.completionDate = this.fixDate(
            //     this.allocationForm.controls["educationArray"].value[0]
            //         .completeDate
            // );
            // request.grade =
            //     this.allocationForm.controls["educationArray"].value[0].grade;
         
            this._services.updateEducationInfomation(request).subscribe(
                (response) => {
                
                    if (response.errorMessage == null) {
                        this._loaderService.hide();
                        this.dialogRef.close();
                        this._messageNotification.successMessage(response.successMessage);
                    }
                },
                (error) => {
                    this._loaderService.hide();
                    this._messageNotification.errorMessage(error.error.errorMessage);
                }
            );
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
