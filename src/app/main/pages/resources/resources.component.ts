import { HttpClient } from "@angular/common/http";
import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { merge, Observable } from "rxjs";
import { map, startWith, switchMap } from "rxjs/operators";
import {
    GetAllProjectsResponse,
    ProjectClient,
    SimpleProjectDto,
} from "../projects/services/ApiServices";
import { Employee } from "../reports/models/reportsRequest";
import { ResourceService } from "../site-projection/service/resource.service";
import { ResourceList, WorkLoadRequest } from "./models/resources";
import { ResourcesService } from "./services/resources.service";
import { ViewAssignmentsComponent } from "./view-assignments/view-assignments.component";

@Component({
    selector: "app-resources",
    templateUrl: "./resources.component.html",
    styleUrls: ["./resources.component.scss"],
})
export class ResourcesComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private _resourceService: ResourcesService,
        private _service: ResourceService,
        private _projectClient: ProjectClient,
        private _httpClient: HttpClient
    ) {}

    resources: ResourceList[];
    dataSource: ResourcesService | null;
    projects: SimpleProjectDto[];
    filterForm: FormGroup;
    isLoading: boolean = true;
    project_Id: any;
    employees: any = [];
    employeeArray: any;
    projectArray;
    employeeId;


    ngOnInit(): void {
        const newRequest = new WorkLoadRequest();
        newRequest.employeeIds = [];
        newRequest.projectIds = [];
        this._resourceService.getWorkload(newRequest).subscribe((response) => {
            this.isLoading = false;
            this.resources = response.employeeWorkload;
            
        });

        this.filterForm = this.fb.group({
            name: new FormControl([]),
            project: new FormControl([]),
        });

        this._projectClient.projects().subscribe((response) => {
            this.projects = response.projects;
        });

        this.onChanges();
    }
    onChanges(): void {
        const newRequest = new WorkLoadRequest();
        newRequest.employeeIds = this.employeeId;
        newRequest.projectIds = this.project_Id;
        this._resourceService
            .getWorkload(newRequest)
            .subscribe((response) => {
                this.isLoading = false;
                this.resources = response.employeeWorkload;
            });
    }

    fixDate(date) {
        date = new Date(date);
        let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
        let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
        date.setHours(hoursDiff);
        date.setMinutes(minutesDiff);
        return date;
    }

    projectId(Id:any){
        this.project_Id=Id;
        this.onChanges();
    }
    getEmployeValue(dataId:any){
        this.employeeId=dataId;
        this.onChanges();
    }

}
