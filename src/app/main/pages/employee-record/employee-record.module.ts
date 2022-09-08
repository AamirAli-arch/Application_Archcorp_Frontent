import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployeeRecordComponent } from "./employee-record.component";
import { RouterModule } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";
import { EmployeeRecordEditComponent } from "./employee-record-edit/employee-record-edit.component";
import { DeletModalPopupComponent } from "./delet-modal-popup/delet-modal-popup.component";
import { EmployeeAttendanceComponent } from "./employee-attendance/employee-attendance.component";
import { SubDashboardComponent } from "./sub-dashboard/sub-dashboard.component";
import { AppPipesModule } from "app/main/pipes/app-pipes.module";
import { MatDialogModule } from "@angular/material/dialog";
import { EmployeeRegisterComponent } from "./employee-register/employee-register.component";
import { MatFormFieldModule } from "@angular/material/form-field";

import { FilePondModule, registerPlugin  } from 'ngx-filepond';
import * as FilePondPluginImagePreview  from 'filepond-plugin-image-preview'
import * as FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);


const routes = [
    {
        path: "employee",
        component: EmployeeRecordComponent,
    },
    {
        path: "employee-attendance",
        component: EmployeeAttendanceComponent,
    },
    {
        path: "admin-dashboard",
        component: SubDashboardComponent,
    },
    {
        path: "emp-register",
        component: EmployeeRegisterComponent,
    },

];

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        FuseSharedModule,
        RouterModule.forChild(routes),
        AppPipesModule,
        MatFormFieldModule,
        FilePondModule
    ],
    declarations: [
        SubDashboardComponent,
        EmployeeRecordEditComponent,
        EmployeeRecordComponent,
        DeletModalPopupComponent,
        EmployeeAttendanceComponent,
        EmployeeRegisterComponent,
    ],

    entryComponents: [
        EmployeeRegisterComponent,
        EmployeeRecordEditComponent,
        DeletModalPopupComponent,
    ],
})
export class EmployeeRecordModule {}
