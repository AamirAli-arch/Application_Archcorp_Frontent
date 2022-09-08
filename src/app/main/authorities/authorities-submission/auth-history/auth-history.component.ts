import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderSpinerService } from 'app/main/pages/loader-spiner/loader-spiner.service';
import { MessageNotifierService } from 'app/services/message-notifier.service';
import { SubmissionService } from '../../services/submission.service';
import { AddStageComponent } from '../add-stage/add-stage.component';

@Component({
  selector: 'app-auth-history',
  templateUrl: './auth-history.component.html',
  styleUrls: ['./auth-history.component.scss']
})
export class AuthHistoryComponent implements OnInit {
    projectId:any;
    title:string;
    masterDeveloperName:string;
    authorityName:string;
    currentStatusName:string;
    submissionId:number;
    stageArray:any=[];
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
    }

  ngOnInit(): void {
    this.getSubmissionList();
  }
     // set multiple color of class
     renderClass(statusString) {
        if (statusString ==='Rejected') {
            return "bg-red";
        } else if (statusString === 'Approved') {
            return "bg-green";
        } else if (statusString === 'Planned') {
            return "bg-plan";
        }else if (statusString === 'Submitted') {
            return "bg-submit";
        }else if (statusString === 'Resubmitted') {
            return "bg-resubmit";
        }
        else  {

        }
    }
  getSubmissionList(){
    this._loaderService.show();
    this._service.submissionDetails(this.projectId).subscribe(
        (response: any) => {
            this._loaderService.hide();
            if (response) {
                console.log('response', response)
                let getData=response.submission
                this.title = getData.title;
                this.submissionId=getData.id;
                this.masterDeveloperName = getData.masterDeveloper;
                this.authorityName = getData.submittedTo;
                this.currentStatusName = getData.currentStatusString;
                this.stageArray=getData.submissionStages;
            }
        },
        (error) => {
            this._messageNotification.errorMessage(
                error.error.errorMessage
            );
        }
    );
  }

  addStage() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { id: this.submissionId };
    dialogConfig.panelClass = "taskallocation4";

    const dialogRef = this.dialog.open(AddStageComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
        if (data) {
            if (data.errorMessage == null) {
                this.getSubmissionList();
            }
        }
    });
}

}
