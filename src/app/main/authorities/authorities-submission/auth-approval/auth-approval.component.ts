import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { LoaderSpinerService } from "app/main/pages/loader-spiner/loader-spiner.service";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { ProjectWithSubmissionPlan } from "../../services/modal/submission";
import { SubmissionService } from "../../services/submission.service";
import { AddAuthComponent } from "../add-auth/add-auth.component";

@Component({
    selector: "app-auth-approval",
    templateUrl: "./auth-approval.component.html",
    styleUrls: ["./auth-approval.component.scss"],
})
export class AuthApprovalComponent implements OnInit {
    filterForm: FormGroup;
    noRecords = false;
    statusArray = [
        { name: "Planned", value: 1 },
        { name: "Submitted", value: 2 },
        { name: "Rejected", value: 3 },
        { name: "Resubmitted", value: 4 },
        { name: "Approved", value: 5 },
        { name: "Overdue", value: 6 },
    ];

    emirateArray = [
        { name: "Dubai", id: 1 },
        { name: "Sharjah", id: 2 },
        { name: "Abu Dhabi", id: 3 },
        { name: "Ajman", id: 4 },
        { name: "Ras Al Khaima", id: 5 },
        { name: "Um Al Quwain", id: 6 },
        { name: "Fujaira", id: 7 },
    ];
    projectId: any;
    projectName: any;
    projectCode: any;
    endDate: any;
    startDate: any;
    authorityArray: any = [];
    stageArray: any = [];
    submissionArray: any=[];
    masterArray: any = [];
    constructor(
        private _service: SubmissionService,
        private fb: FormBuilder,
        public dialog: MatDialog,
        private router: Router,
        private _messageNotification: MessageNotifierService,
        private _loaderService: LoaderSpinerService,
        private _Activatedroute: ActivatedRoute
    ) {
        this.projectId = this._Activatedroute.snapshot.paramMap.get("id");
        console.log("id", this.projectId);
    }

    ngOnInit(): void {
        this.filterForm = this.fb.group({
            status: new FormControl(),
            //emirate:new FormControl(),
            authority: new FormControl(),
            stageId: new FormControl(),
            ///masterId: new FormControl(),
        });
        this.getProjectWithSubmissionList();
        this.filterForm.valueChanges.subscribe((response:any) =>{
            this.getProjectWithSubmissionList();
        })
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

  getProjectWithSubmissionList(){
        this._loaderService.show();
        let request = new ProjectWithSubmissionPlan();
        request.projectId=this.projectId;
        request.submittedTo= this.filterForm.controls['authority'].value;
        request.status= this.filterForm.controls["status"].value ==null ? 0 : this.filterForm.controls["status"].value;
        request.stageId= this.filterForm.controls['stageId'].value ==null ? 0 : this.filterForm.controls['stageId'].value;
        //request.masterDeveloperId= this.filterForm.controls['masterId'].value ==null ? 0 : this.filterForm.controls['masterId'].value;
        this._service.getProjectList(request).subscribe(
            (response) => {

                if (response.errorMessage == null) {
                    this._loaderService.hide();
                    this.submissionArray= response.submissions.submissions;
                    this.projectName = response.submissions.projectName;
                    this.projectCode = response.submissions.projectCode;
                    this.endDate = response.submissions.endDate;
                    this.startDate = response.submissions.startDate;
                    if (this.submissionArray.length == 0) {
                        this.noRecords = true;
                    } else {
                        this.noRecords = false;
                    }
                    // this._messageNotification.successMessage(
                    //     response.successMessage
                    // );
                }
            },
            (error) => {
                this.noRecords = false;
                this._loaderService.hide();
                this._messageNotification.errorMessage(
                    error.error.errorMessage
                );
            }
        );
  }

    timeLineView() {
        this.router.navigate(["authorities/history"]);
    }
    addStage() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { id: this.projectId };
        dialogConfig.panelClass = "projectassignComponent";

        const dialogRef = this.dialog.open(AddAuthComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                    this.getProjectWithSubmissionList();
                }
            }
        });
    }
}
