import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EducationInformationComponent } from "./education-information/education-information.component";
import { EmergencyContactComponent } from "./emergency-contact/emergency-contact.component";
import { ExperienceInformationComponent } from "./experience-information/experience-information.component";
import { FamilyInformationComponent } from "./family-information/family-information.component";
import { employeeProfile } from "./models/profile";
import { PersonalInfomationComponent } from "./personal-infomation/personal-infomation.component";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { ProfileService } from "./services/profile.service";
import { Subscription } from 'rxjs';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
    profiledata:any;
    geteployeeId;
    constructor(private _Activatedroute:ActivatedRoute,private dialog: MatDialog, private _services:ProfileService) {}

    ngOnInit(): void {

        this.geteployeeId=this._Activatedroute.snapshot.paramMap.get("id")
        if(this.geteployeeId){
            this.profiledata = new employeeProfile
            this._services.getEmployeeProfile(this.geteployeeId).subscribe((response:any) =>{
               
                const getprofiledata= response.employeeProfile
                this.profiledata= response.employeeProfile
                // this.profiledata.professionalEmail=getprofiledata.professionalEmail;
            })
        }
       
    }

    profileEdit() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {};
        dialogConfig.panelClass="projectassignComponent"

        const dialogRef = this.dialog.open(ProfileEditComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                }
            }
        });
    }

    emergencyContact() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {};
        dialogConfig.panelClass="projectassignComponent"

        const dialogRef = this.dialog.open(EmergencyContactComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                }
            }
        });
    }

    personalInfomation() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {};
        dialogConfig.panelClass="projectassignComponent"

        const dialogRef = this.dialog.open(PersonalInfomationComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                }
            }
        });
    }

    familyInfomation() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {};
        dialogConfig.panelClass="projectassignComponent"

        const dialogRef = this.dialog.open(FamilyInformationComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                }
            }
        });
    }

    educationInfomation() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {};
        dialogConfig.panelClass="projectassignComponent"
        const dialogRef = this.dialog.open(EducationInformationComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                }
            }
        });
    }

    experienceInfomation() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {};
        dialogConfig.panelClass="projectassignComponent"

        const dialogRef = this.dialog.open(ExperienceInformationComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                }
            }
        });
    }


}
