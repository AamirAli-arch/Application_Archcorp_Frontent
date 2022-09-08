import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "../../charts/chart/app-material/material.module";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { FuseSharedModule } from "@fuse/shared.module";

import { ProjectsComponent } from "./projects.component";
import { CreateProjectComponent } from "./create-project/create-project.component";

import {
    API_BASE_URL,
    AuthClient,
    ProjectClient,
    TaskClient,
    DepartmentClient,
    TaskResourceClient,
} from "./services/ApiServices";
import { environment } from "../../../../environments/environment";
import { ProjectViewComponent } from "./project-view/project-view.component";
import { TaskAllocationComponent } from "app/main/charts/task-allocation/task-allocation.component";
import { TaskTimesheetComponent } from "app/main/charts/task-timesheet/task-timesheet.component";
import { ProjectassignComponent } from "./projectassign/projectassign.component";

import { ResourceTaskScheduleClient, TaskTimeSheetClient } from "app/main/charts/chart/services/ApiServices";
import { ResourceModalpopupComponent } from './resource-modalpopup/resource-modalpopup.component';

const routes = [
    {
        path: "projects",
        component: ProjectsComponent,
    },
    {
        path: "view/:id",
        component: ProjectViewComponent,
    },
];

@NgModule({
    declarations: [
        ProjectsComponent,
        CreateProjectComponent,
        ProjectViewComponent,
        ProjectassignComponent,
        ResourceModalpopupComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MaterialModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        MatProgressSpinnerModule,
    ],
    providers: [
        AuthClient,
        ProjectClient,
        TaskClient,
        DepartmentClient,
        TaskResourceClient,
        TaskTimeSheetClient,
        ResourceTaskScheduleClient,
        {
            provide: API_BASE_URL,
            useValue: environment.apiUrl,
        },
    ],
    entryComponents: [
        ProjectassignComponent,
        TaskAllocationComponent,
        TaskTimesheetComponent,
        CreateProjectComponent,
        ResourceModalpopupComponent
    ],
})
export class ProjectsModule {}
