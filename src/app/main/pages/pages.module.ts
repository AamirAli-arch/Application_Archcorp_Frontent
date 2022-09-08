import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ApprovalsModule } from "./approvals/approvals.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { LeaveApplicationModule } from "./leave-application/leave-application.module";
import { NotificationModule } from "./notification/notification.module";

import { ProjectsModule } from "./projects/projects.module";
import { ReportsModule } from "./reports/reports.module";
import { ResourceAssignmentModule } from "./resource-assignment/resource-assignment.module";
import { ResourcesModule } from "./resources/resources.module";

import {
    API_BASE_URL,
    DepartmentClient,
    TaskResourceClient,
    ProjectClient
} from "../charts/chart/services/ApiServices";
import { environment } from "environments/environment";
import { TimeoffemailModule } from "./timeoff-emailtemplate/timeoffemail/timeoffemail.module";
import { ProfileModule } from "./profile/profile.module";
import { EmployeeRecordModule } from "./employee-record/employee-record.module";
import { TicketModule } from "./ticket/ticket.module";
import { GanttResourceAllocationModule } from "./gantt-resource-allocation/gantt-resource-allocation.module";
import { SiteProjectionModule } from "./site-projection/site-projection.module";
import { EmployeeTimelineModule } from "./employee-timeline/employee-timeline.module";
import { SystemModule } from "./system/system.module";
import { FinancialReportModule } from "./financial-report/financial-report.module";
import { DeletePopupComponent } from "./delete-popup/delete-popup.component";
import { ProjectWiseProfitLossModule } from "./project-wise-profit-loss/project-wise-profit-loss.module";
import { BuildingfloorModule } from "./buildingfloor/buildingfloor.module";
import { TechnicalCardsModule } from "./technical-cards/technical-cards.module";
import { RulesetsModule } from "./rulesets/rulesets.module";
import { ProjectNotesModule } from "./project-notes/project-notes.module";
import { SubmittalModule } from "./submittals/submittals.module";
import { MyDashboardModule } from "./my-dashboard/my-dashboard.module";
import { SubmissionsByStatusModule } from "./submissions-by-status/submissions-by-status.module";




@NgModule({
    declarations: [DeletePopupComponent, ],
    imports: [
        ProjectsModule,
        ReportsModule,
        ApprovalsModule,
        ResourcesModule,
        ResourceAssignmentModule,
        LeaveApplicationModule,
        NotificationModule,
        CommonModule,
        DashboardModule,
        TimeoffemailModule,
        ProfileModule,
        EmployeeRecordModule,
        TicketModule,
        GanttResourceAllocationModule,
        SiteProjectionModule,
        EmployeeTimelineModule,
        SystemModule,
        FinancialReportModule,
        ProjectWiseProfitLossModule,
        BuildingfloorModule,
        TechnicalCardsModule,
        RulesetsModule,
        ProjectNotesModule,
        SubmittalModule,
        MyDashboardModule,
        SubmissionsByStatusModule,
        //HttpClientModule
    ],
    exports: [ DeletePopupComponent],
    providers: [
        DepartmentClient,
        TaskResourceClient,
        ProjectClient,
        {
            provide: API_BASE_URL,
            useValue: environment.apiUrl,
        },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
