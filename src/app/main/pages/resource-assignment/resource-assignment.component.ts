import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
    ProjectClient,
    SimpleProjectDto,
} from "app/main/charts/chart/services/ApiServices";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { Employee } from "../reports/models/reportsRequest";
import { ReportsService } from "../reports/services/reports.service";
import { TaskRequest } from "./models/resource-assignment";
import { AssignmentServices } from "./services/assignment-services.service";

@Component({
    selector: "app-resource-assignment",
    templateUrl: "./resource-assignment.component.html",
    styleUrls: ["./resource-assignment.component.scss"],
})
export class ResourceAssignmentComponent implements OnInit {
    assignForm: FormGroup;
    employees: Employee[];
    projects: SimpleProjectDto[];
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

    constructor(
        private fb: FormBuilder,
        private _reportsService: ReportsService,
        private _messageNotification: MessageNotifierService,
        private _assignmentService: AssignmentServices,
        private _snackBar: MatSnackBar,
        private _projectClient: ProjectClient
    ) {}

    ngOnInit(): void {
        this.assignForm = this.fb.group({
            name: new FormControl([], Validators.minLength(1)),
            projects: new FormControl([], Validators.minLength(1)),
            verb: new FormControl("", Validators.required),
            startDate: new FormControl("", Validators.required),
            endDate: new FormControl("", Validators.required),
            taskName: new FormControl("", Validators.required),
            duration: new FormControl("", Validators.required),
        });

        this._reportsService.getEmployees().subscribe((response) => {
            this.employees = response.employees;
        });

        this._projectClient.projects().subscribe((response) => {
            this.projects = response.projects;
        });
    }

    update() {
        const request = new TaskRequest();
        request.employeeId = this.assignForm.controls.name.value;
        request.projectIds = this.assignForm.controls.projects.value;
        request.verb = this.assignForm.controls.verb.value;
        request.startDate = this.fixDate(
            this.assignForm.controls.startDate.value
        );
        request.endDate = this.fixDate(this.assignForm.controls.endDate.value);
        request.name = this.assignForm.controls.taskName.value;
        request.duration = this.assignForm.controls.duration.value;

        this._assignmentService.setTaskAssignment(request).subscribe(
            (response) => {
                if (response.errorMessage == null) {
                    this._messageNotification.successMessage(
                        response.successMessage
                    );
                }
            },
            (error) => {
                this._messageNotification.errorMessage(
                    error.error.errorMessage
                );
            }
        );
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
