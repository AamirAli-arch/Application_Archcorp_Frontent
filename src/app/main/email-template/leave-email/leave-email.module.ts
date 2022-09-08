import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LeaveEmailComponent } from './leave-email.component';
import { CommonModule } from '@angular/common';


const routes: Routes = [
    {
        path     : 'classic',
        component: LeaveEmailComponent
    },
]

@NgModule({
  declarations: [LeaveEmailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class LeaveEmailModule { }
