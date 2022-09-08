import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { ApplyLeaveComponent } from "./apply-leave/apply-leave.component";
import { MaterialModule } from "app/common/app-material/material.module";
import { RouterModule } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LeaveSummaryComponent } from "./leave-summary/leave-summary.component";
import { LeaveDetailsComponent } from "./leave-details/leave-details.component";
import { ChartsModule } from "ng2-charts";
import { ViewLeavesComponent } from "./view-leaves/view-leaves.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { AppPipesModule } from "app/main/pipes/app-pipes.module";

import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { LeaveTimeComponent } from "./leave-time/leave-time.component";
import { FuseSharedModule } from "@fuse/shared.module";
import { MatTableExporterModule } from "mat-table-exporter";
import { ModalpopupComponent } from "./modalpopup/modalpopup.component";
import { EmployeeLeaveComponent } from "./employee-leave/employee-leave.component";
import { TimeOffrequestLeaveComponent } from "./time-offrequest-leave/time-offrequest-leave.component";
import { LeaveTimeLineComponent } from './leave-time-line/leave-time-line.component';

const routes = [
    {
        path: "apply-leave",
        component: ApplyLeaveComponent,
    },
    {
        path: "leave-summary",
        component: LeaveSummaryComponent,
    },
    {
        path: "leave-details/:id",
        component: LeaveDetailsComponent,
    },
    {
        path: "view-leaves",
        component: ViewLeavesComponent,
    },
    {
        path: "time-leaves",
        component: LeaveTimeComponent,
    },
    {
        path: "myleave-request",
        component: EmployeeLeaveComponent,
    },
    {
        path: "timeoff-leaves",
        component: TimeOffrequestLeaveComponent,
    },
    {
        path: "leavetimeline",
        component: LeaveTimeLineComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxMaterialTimepickerModule,
        MaterialModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        ChartsModule,
        MatTableModule,
        MatPaginatorModule,
        AppPipesModule,
        FuseSharedModule,
        MatTableExporterModule,
    ],
    declarations: [
       // LoaderSpinerComponent,
        ApplyLeaveComponent,
        LeaveSummaryComponent,
        LeaveDetailsComponent,
        ViewLeavesComponent,
        LeaveTimeComponent,
        ModalpopupComponent,
        EmployeeLeaveComponent,
        TimeOffrequestLeaveComponent,
        LeaveTimeLineComponent,
    ],
    providers: [DatePipe],
    entryComponents: [ModalpopupComponent],
})
export class LeaveApplicationModule {}
