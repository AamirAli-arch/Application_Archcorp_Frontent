import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetedhoursComponent } from './budgetedhours.component';
import { AddbudgetedComponent } from './addbudgeted/addbudgeted.component';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { AppPipesModule } from '../pipes/app-pipes.module';
import { BudgeteResourceAllocationComponent } from './budgete-resource-allocation/budgete-resource-allocation.component';
import { AssignModalComponent } from './assign-modal/assign-modal.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BudgetNumberComponent } from './budget-number/budget-number.component';


const routes = [
    {
        path: "add/:id",
        component: BudgetedhoursComponent,
    },
    {
        path: "resource-allocation/:id",
        component: BudgeteResourceAllocationComponent,
    },

];

@NgModule({
  declarations: [BudgetedhoursComponent, AddbudgetedComponent,BudgeteResourceAllocationComponent, AssignModalComponent, BudgetNumberComponent],
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
  entryComponents:[AddbudgetedComponent, AssignModalComponent]
})
export class BudgetedhoursModule { }
