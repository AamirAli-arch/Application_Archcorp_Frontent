import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import {
    CreateProjectRequest,
} from "../services/ApiServices";
import {
    FormGroup,
    FormBuilder,
    FormControl,
    Validators,
} from "@angular/forms";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { ProjectService } from "../services/project.services";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { CreateProject } from "../models/projectrequest";

@Component({
    selector: "app-create-project",
    templateUrl: "./create-project.component.html",
    styleUrls: ["./create-project.component.scss"],
})
export class CreateProjectComponent implements OnInit {
    projectForm: FormGroup;
    createProject: CreateProjectRequest;
    getProjectId: any;
    projectTypeArray = [
        { name: "Design", id: 1 },
        { name: "Supervision", id: 2 },
        { name: "Both", id: 3 },
        { name: "Other", id: 4 }
    ];
    constructor(
        private dialogRef: MatDialogRef<CreateProjectComponent>,
        private fb: FormBuilder,
        private _messageNotification: MessageNotifierService,
        private router: Router,
        private _loaderService: LoaderSpinerService,
        private _service: ProjectService,
        @Inject(MAT_DIALOG_DATA) data
    ) {

        this.getProjectId = data;
    }

    ngOnInit() {
        this.projectForm = this.fb.group({
            projectName: new FormControl("", Validators.required),
            projectCode: new FormControl("", Validators.required),
            startDate: new FormControl("", Validators.required),
            endDate: new FormControl("", Validators.required),
            location: new FormControl("", Validators.required),
            projectType: new FormControl("", Validators.required),
        });
        if (this.getProjectId != "add") {
            this._loaderService.show();
            this._service
                .getProjectDeatils(this.getProjectId)
                .subscribe((response) => {
                    if (response) {
                        this._loaderService.hide();
                        this.projectForm.patchValue({
                            projectName: response.project.projectName,
                            projectCode: response.project.projectCode,
                            startDate: response.project.startDate,
                            endDate: response.project.endDate,
                            location: response.project.location,
                            projectType: response.project.projectType,
                        });
                    }
                });
        }
    }

    onSubmit() {
        if (this.projectForm.valid) {
            let project = new CreateProject();
            project.projectName = this.projectForm.get("projectName").value;
            project.projectCode = this.projectForm.get("projectCode").value;
            project.startDate = this.fixDate(
                this.projectForm.get("startDate").value
            );
            project.endDate = this.fixDate(
                this.projectForm.get("endDate").value
            );
            project.location = this.projectForm.get("location").value;
            project.projectType = this.projectForm.get("projectType").value;

            if (this.getProjectId === "add") {
                this._loaderService.show();
                this._service.createProject(project).subscribe(
                    (respose) => {
                        if (respose.errorMessage == null) {
                            this._loaderService.hide();
                            this._messageNotification.successMessage(
                                respose.successMessage
                            );
                            this.router.navigate([
                                "/charts/" + respose.project.id,
                            ]);
                            this.close();
                        }
                    },
                    (error) => {
                        this._loaderService.hide();
                        this._messageNotification.errorMessage(
                            error.error.errorMessage
                        );
                    }
                );
            } else {
                project.id = this.getProjectId;
                this._loaderService.show();
                this._service.updateProject(project).subscribe(
                    (respose) => {
                        if (respose.errorMessage == null) {
                            this._loaderService.hide();
                            this.router.navigate(["pages/projects"]);
                            this._messageNotification.successMessage(
                                respose.successMessage
                            );
                            this.close();
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

    close() {
        this.dialogRef.close();
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
