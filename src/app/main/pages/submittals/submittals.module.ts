import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableExporterModule } from 'mat-table-exporter';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MaterialModule } from "../../charts/chart/app-material/material.module";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { FuseSharedModule } from "@fuse/shared.module";
import { AppPipesModule } from 'app/main/pipes/app-pipes.module';
import { ChartsModule } from 'ng2-charts';
// import {
//     API_BASE_URL,
//     AuthClient,
//     // ProjectClient,
//     // TaskClient,
//     // DepartmentClient,
//     // TaskResourceClient,
// } from "./services/ApiServices";

//Below One Added 
import { API_BASE_URL,AuthClient } from "../projects/services/ApiServices";
import { SubmittalsComponent } from "./submittals.component";
import { environment } from '../../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DatePipe } from '@angular/common';

const routes = [
    {
        path: "submittals",
        component: SubmittalsComponent,
    },
    // {
    //     path: "view/:id",
    //     component: ProjectViewComponent,
    // },
];

@NgModule({
    declarations: [
        SubmittalsComponent
        // CreateProjectComponent,
        // ProjectViewComponent,
        // ProjectassignComponent,
        // ResourceModalpopupComponent,
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
        FuseSharedModule,
        NgxMaterialTimepickerModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatDividerModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatTableExporterModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        AppPipesModule,
        MatTooltipModule,
        ChartsModule
    ],
    providers: [
        AuthClient,
        // ProjectClient,
        // TaskClient,
        // DepartmentClient,
        // TaskResourceClient,
        // TaskTimeSheetClient,
        // ResourceTaskScheduleClient,
        {
            provide: API_BASE_URL,
            useValue: environment.apiUrl,
        },
    ],
    entryComponents: [
        // ProjectassignComponent,
        // TaskAllocationComponent,
        // TaskTimesheetComponent,
        // CreateProjectComponent,
        // ResourceModalpopupComponent
    ],
})
export class SubmittalModule {}
