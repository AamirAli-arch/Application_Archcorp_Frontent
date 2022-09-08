import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { AppPipesModule } from 'app/main/pipes/app-pipes.module';
import { AuthoritiesSubmissionComponent } from './authorities-submission.component';
import { AuthApprovalComponent } from './auth-approval/auth-approval.component';
import { AuthHistoryComponent } from './auth-history/auth-history.component';
import { AddAuthComponent } from './add-auth/add-auth.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddStageComponent } from './add-stage/add-stage.component';

const routes = [
    {
        path: "",
        component: AuthoritiesSubmissionComponent,
    },
    {
        path: "approval/:id",
        component: AuthApprovalComponent,
    },
    {
        path: "history/:id",
        component: AuthHistoryComponent,
    },
];



@NgModule({
  declarations: [AuthoritiesSubmissionComponent, AuthApprovalComponent, AuthHistoryComponent, AddAuthComponent, AddStageComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FuseSharedModule,
    RouterModule.forChild(routes),
    AppPipesModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents:[AddAuthComponent, AddStageComponent]
})
export class AuthoritiesSubmissionModule { }
