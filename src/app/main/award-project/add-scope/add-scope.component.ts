import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
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
import { AddScopeRequest, AwardContractRequest } from "../modal/award-modal";
import { AwardservicesService } from "../services/awardservices.service";

@Component({
  selector: 'app-add-scope',
  templateUrl: './add-scope.component.html',
  styleUrls: ['./add-scope.component.scss']
})
export class AddScopeComponent implements OnInit {
    addContractForm: FormGroup;
    statDate: any;
    endDate: any;
    departmentArray = [{ name: "", value: "" }];
    projectArray: any = [];
    projectId: any;
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
        console.log("project Id", data);
        this.projectId = data;
    }

    ngOnInit(): void {
        this.addContractForm = this.fb.group({
            bankGuarantee: new FormControl(""),
        });
    }

    onSubmit() {
        if (this.addContractForm.valid) {
            let request = new AddScopeRequest();
            request.description = this.addContractForm.controls['bankGuarantee'].value;
            request.masterScopeId=this.projectId;
            this._loaderService.show();
            this._service.addMoreProjectScope(request).subscribe(
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
