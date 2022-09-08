import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { LoaderSpinerService } from "app/main/pages/loader-spiner/loader-spiner.service";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { AwardProjectRequest } from "../modal/award-modal";
import { AwardservicesService } from "../services/awardservices.service";

@Component({
    selector: "app-addprject",
    templateUrl: "./addprject.component.html",
    styleUrls: ["./addprject.component.scss"],
})
export class AddprjectComponent implements OnInit {
    addAuthForm: FormGroup;
    statDate: any;
    endDate: any;
    departmentArray = [{ name: "", value: "" }];
    projectId: any;
    authorityArray:any=[];
    masterDeveloperArray:any=[];
    constructor(
        private _service: AwardservicesService, private _messageNotification:MessageNotifierService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddprjectComponent>,
        private dialog: MatDialog,
        private _loaderService: LoaderSpinerService, @Inject(MAT_DIALOG_DATA) public data : any
    ) {
        console.log('project Id', data)
        this.projectId=data;
    }

    ngOnInit(): void {
        this.addAuthForm = this.fb.group({
            project: new FormControl(""),
            employer: new FormControl(""),
            location: new FormControl(""),
            plotNumber: new FormControl(""),
            plotArea: new FormControl(""),
            gFA: new FormControl(""),
            noOfFloors: new FormControl(""),
            parkingRequired: new FormControl(""),
            extentionAreas: new FormControl(""),
            projectBudget: new FormControl(""),
            category: new FormControl(""),
            typology: new FormControl(""),
            specialApprovals: new FormControl(""),
            authorityId: new FormControl(""),
            masterDeveloperId: new FormControl(""),
            estimatedBUA: new FormControl(""),
        });

        this._service.getMasterDeveloper().subscribe((response:any) =>{
            console.log('developr',response)
            if(response){
                this.masterDeveloperArray=response.authorities;
            }
        })

        this._service.getAuthorityList().subscribe((response:any) =>{
            console.log('getAuthorityList',response)
            if(response){
                this.authorityArray=response.authorities;
            }
        })

    }



    onSubmit() {
        if(this.addAuthForm.valid){
            let request = new AwardProjectRequest();
            request.ProjectId=this.projectId;
            request.ProjectId=this.addAuthForm.controls['project'].value;
            request.Employer=this.addAuthForm.controls['Employer'].value;
            request.Location=this.addAuthForm.controls['location'].value;
            request.PlotNumber=this.addAuthForm.controls['plotNumber'].value;
            request.PlotArea=this.addAuthForm.controls['plotArea'].value;
            request.GFA=this.addAuthForm.controls['gFA'].value;
            request.EstimatedBUA=this.addAuthForm.controls['estimatedBUA'].value;
            request.NoOfFloors=this.addAuthForm.controls['noOfFloors'].value;
            request.ParkingRequired=this.addAuthForm.controls['parking'].value;
            request.ExtentionAreas=this.addAuthForm.controls['extentionAreas'].value;
            request.ProjectBudget=this.addAuthForm.controls['projectBudget'].value;
            request.Category=this.addAuthForm.controls['category'].value;
            request.Typology=this.addAuthForm.controls['typology'].value;
            request.SpecialApprovals=this.addAuthForm.controls['specialApprovals'].value;
            request.AuthorityId=this.addAuthForm.controls['authorityId'].value;
            request.MasterDeveloperId=this.addAuthForm.controls['masterDeveloperId'].value;
            this._loaderService.show();
            this._service.addDetails(request).subscribe(
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
}
