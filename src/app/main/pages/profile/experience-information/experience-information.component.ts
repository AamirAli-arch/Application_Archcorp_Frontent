import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, FormArray } from "@angular/forms";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { experienceInformation } from "../models/profile";
import { ProfileService } from "../services/profile.service";

@Component({
  selector: 'app-experience-information',
  templateUrl: './experience-information.component.html',
  styleUrls: ['./experience-information.component.scss']
})
export class ExperienceInformationComponent implements OnInit {
    allocationForm: FormGroup;
    experienceArray: FormArray;
    statDate: any;
    endDate: any;
    departmentArray = [{ name: "", value: "" }];
    getId: number;
    constructor(
        private fb: FormBuilder,private _messageNotification:MessageNotifierService,
        private dialogRef: MatDialogRef<ExperienceInformationComponent>,
        private dialog: MatDialog,   private _loaderService: LoaderSpinerService,
        private _snackBar: MatSnackBar, private _services: ProfileService
    ) {}

    ngOnInit(): void {
        this.allocationForm = this.fb.group({
            experienceArray: this.fb.array([this.createItem()])
        });
    }
    createItem() {
        return this.fb.group({
            companyName: new FormControl(""),
            location: new FormControl(""),
            startingDate: new FormControl(""),
            completeDate: new FormControl(""),
            jobPosition: new FormControl(""),
        })
      }

      addItem() {
        this.experienceArray = this.allocationForm.get('experienceArray') as FormArray;
        this.experienceArray.push(this.createItem());
      }


      deleteAddressGroup(index: number) {
        const add = this.allocationForm.get('experienceArray') as FormArray;
        add.removeAt(index)
      }



      updateExperience() {
        
        if (this.allocationForm.valid) {
            let request = new experienceInformation();
            request.id = this.getId;
            request=this.allocationForm.controls["experienceArray"].value
            // request.company =this.allocationForm.controls["experienceArray"].value[0].companyName;
            // request.location =this.allocationForm.controls["experienceArray"].value[0].location;
            // request.from = this.fixDate(this.allocationForm.controls["experienceArray"].value[0].startingDate);
            // request.to = this.fixDate(this.allocationForm.controls["experienceArray"].value[0].completeDate);         
            // request.position =this.allocationForm.controls["experienceArray"].value[0].jobPosition;
          
            this._services.updateExperienceInfo(request).subscribe(
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
