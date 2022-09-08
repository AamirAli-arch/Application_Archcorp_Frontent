import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectWiseProfitLossComponent } from './project-wise-profit-loss.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { AppPipesModule } from 'app/main/pipes/app-pipes.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const routes = [
  {
      path: "projectprofitloss",
      component: ProjectWiseProfitLossComponent,
  },
 
];

@NgModule({
  declarations: [ProjectWiseProfitLossComponent],
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
  ]
})
export class ProjectWiseProfitLossModule { }
