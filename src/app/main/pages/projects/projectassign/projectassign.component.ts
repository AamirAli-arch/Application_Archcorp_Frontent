import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";

import { TaskRequest, TaskRequestDelete } from "../models/projectrequest";
import { ProjectService } from "../services/project.services";

import * as Moment from "moment";
import { extendMoment } from "moment-range";
import { ConditionalExpr } from "@angular/compiler";
const moment = extendMoment(Moment);

@Component({
    selector: "app-projectassign",
    templateUrl: "./projectassign.component.html",
    styleUrls: ["./projectassign.component.scss"],
})
export class ProjectassignComponent implements OnInit {
    allocationForm: FormGroup;
    validations: any[] = [];
    minDate: Date;
    range = new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
    });
    getNode;
    verbList = [
        "Analyze",
        "Identify",
        "Coordinate",
        "Ensure",
        "Design",
        "Model",
        "Calculate",
        "Strategize",
        "Confirm",
    ];
    title: any;
    taskId: any;
    hours: any;
    statDate = new Date();
    endDate = new Date();
    projectId;
    parentTaskId: number;
    getTypeName: string;
    parentEndDate;
    setStartDate: any;
    setEndDate: any;
    parentStartDate:any;
    constructor(
        private _messageNotification: MessageNotifierService,
        private _loaderService: LoaderSpinerService,
        private _projectService: ProjectService,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<ProjectassignComponent>,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar
    ) {
       
        this.getTypeName = data.name;
        this.title = data.node.name;
        this.taskId = data.node.id;
        this.hours = data.node.duration;
        this.parentStartDate= data.parentStartDate;
        this.statDate = data.stardate;
        this.endDate = data.node.endDate;
        this.parentEndDate = data.parentEndDate;
        this.projectId = data.node.projectId;
        this.parentTaskId = data.node.parentTaskId;
        console.log('data', data)
        console.log(' this.statDate',  this.statDate)

        if (this.getTypeName === "edit") {
            this.allocationForm = this.fb.group({
                newtask: new FormControl(this.title),
                verb: new FormControl(data.node.verb),
                startDate: new FormControl(this.statDate),
                endDate: new FormControl(this.endDate),
                hours: new FormControl(data.node.duration),
            });
        }
    }

    ngOnInit(): void {
        if (this.getTypeName === "add") {
            this.allocationForm = this.fb.group({
                newtask: new FormControl(""),
                verb: new FormControl(""),
                startDate: new FormControl(this.statDate),
                endDate: new FormControl(this.endDate),
                hours: new FormControl(""),
            });
        }
    }

    calculateWorkdays(startDate: Date, endDate: Date): number {
        const totalDays: number =
            moment(endDate).diff(moment(startDate), "days") + 1;
        const dayOfWeek = moment(startDate).isoWeekday();
        let totalWorkdays = 0;
        // Skips Friday and Saturday
        for (let i = dayOfWeek; i < totalDays + dayOfWeek; i++) {
            if (i % 7 !== 6 && i % 7 !== 5) {
                totalWorkdays++;
            }
        }
        if (startDate && endDate) {
            this.allocationForm.patchValue({
                hours: totalWorkdays * 9,
            });
        }
        return totalWorkdays;
    }

    getStartDate(date: MatDatepickerInputEvent<Date>) {
        this.setStartDate = date;
        if (this.setEndDate && this.setStartDate) {
            this.calculateWorkdays(this.setStartDate, this.setEndDate);
        }
    }
    getEndDate(date: MatDatepickerInputEvent<Date>) {
        this.setEndDate = date;
        if (this.setEndDate && this.setStartDate) {
            this.calculateWorkdays(this.setStartDate, this.setEndDate);
        }
    }
    addTask() {
        if (this.allocationForm.valid) {

            const request = new TaskRequest();
            request.startDate = this.fixDate(
                this.allocationForm.get("startDate").value
            );
            request.endDate = this.fixDate(
                this.allocationForm.get("endDate").value
            );
            request.name = this.allocationForm.get("newtask").value;
            request.duration = this.allocationForm.get("hours").value;
            request.verb = this.allocationForm.get("verb").value;
            request.projectId = this.projectId;
            if (this.getTypeName === "add") {
                //request.parentTaskId = this.parentTaskId === null ? this.taskId : null;
                request.parentTaskId = this.taskId;
                this._loaderService.show();
                this._projectService.createProjectTask(request).subscribe(
                    (respose: any) => {
                        if (respose.errorMessage == null) {
                            this._loaderService.hide();
                            this._messageNotification.successMessage(
                                respose.successMessage
                            );
                            this.dialogRef.close(respose);
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
                request.id = this.taskId;
                request.parentTaskId = this.parentTaskId;
                this._loaderService.show();
                this._projectService.updateProjectTask(request).subscribe(
                    (respose: any) => {
                        if (respose.errorMessage == null) {
                            this._loaderService.hide();
                            this._messageNotification.successMessage(
                                respose.successMessage
                            );
                            this.dialogRef.close(respose);
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

    save() {
        this.dialogRef.close();
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
