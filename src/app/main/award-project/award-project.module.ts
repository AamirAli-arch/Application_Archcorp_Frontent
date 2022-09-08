import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AwardProjectComponent } from './award-project.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { AppPipesModule } from '../pipes/app-pipes.module';
import { AddprjectComponent } from './addprject/addprject.component';
import { AddContractComponent } from './add-contract/add-contract.component';
import { AddProjectscopeComponent } from './add-projectscope/add-projectscope.component';
import { AddScopeComponent } from './add-scope/add-scope.component';
import { ProjectScopeViewComponent } from './project-scope-view/project-scope-view.component';
import { CommentModalComponent } from './comment-modal/comment-modal.component';
import { DetailsContractComponent } from './details-contract/details-contract.component';

const routes = [
    {
        path: "add/:id",
        component: AwardProjectComponent,
    },
    {
        path: "view/:id",
        component: ProjectScopeViewComponent,
    },
    {
        path: "detail-contract",
        component: DetailsContractComponent,
    },

];

@NgModule({
  declarations: [AwardProjectComponent, AddprjectComponent, AddContractComponent, AddProjectscopeComponent, AddScopeComponent, ProjectScopeViewComponent, CommentModalComponent, DetailsContractComponent],
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
  entryComponents:[CommentModalComponent,AddScopeComponent,AddprjectComponent,AddContractComponent,AddProjectscopeComponent]
})
export class AwardProjectModule { }
