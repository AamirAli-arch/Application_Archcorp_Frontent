import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialog,
} from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoaderSpinerService } from "app/main/pages/loader-spiner/loader-spiner.service";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { AddScopeComponent } from "../add-scope/add-scope.component";
import {
    CommentRequest,
    ViewRequest,
} from "../modal/award-modal";
import { AwardservicesService } from "../services/awardservices.service";

@Component({
    selector: "app-comment-modal",
    templateUrl: "./comment-modal.component.html",
    styleUrls: ["./comment-modal.component.scss"],
})
export class CommentModalComponent implements OnInit {
    addCommentForm: FormGroup;
    statDate: any;
    endDate: any;
    departmentArray = [{ name: "", value: "" }];
    projectArray: any = [];
    projectId: any;
    getType: string;
    scopeId: number;
    viewtext: string;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _messageNotification: MessageNotifierService,
        private _service: AwardservicesService,
        private _loaderService: LoaderSpinerService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddScopeComponent>,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar
    ) {
        this.projectId = data.projectId;
        this.scopeId = data.scopeId;
        this.getType = data.type;
    }

    ngOnInit(): void {
        this.addCommentForm = this.fb.group({
            comment: new FormControl(""),
        });

        if (this.getType == "viewComment") {
            let request = new ViewRequest();
            request.projectId = this.projectId;
            request.scopeId = this.scopeId;
            this._loaderService.show();
            this._service
                .viewProjectScope(request)
                .subscribe((response: any) => {
                    if (response) {
                        this._loaderService.hide();
                        this.viewtext = response.projectScopeNote.note;
                    }
                },
                (error) => {
                    this.dialogRef.close();
                    this._loaderService.hide();
                    this._messageNotification.errorMessage(
                        error.error.errorMessage
                    );
                });
        }
    }

    onSubmit() {
        if (this.addCommentForm.valid) {
            let request = new CommentRequest();
            request.note = this.addCommentForm.controls["comment"].value;
            request.projectId = this.projectId;
            request.scopeId = this.scopeId;
            this._loaderService.show();
            this._service.commentProjectScope(request).subscribe(
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
