import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingfloorComponent } from './buildingfloor.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialModule } from 'app/common/app-material/material.module';
import { AppPipesModule } from 'app/main/pipes/app-pipes.module';
import { BuildingWallComponent } from './building-wall/building-wall.component';
import { FloorfinishloadComponent } from './floorfinishload/floorfinishload.component';
import { NestedFilterPipe } from './nested-filter.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ProjectSearchDropdownComponent } from './project-search-dropdown/project-search-dropdown.component';
import { ErrorProjectListComponent } from './error-project-list/error-project-list.component';

const routes = [
    {
        path: "floor-plan",
        component: BuildingfloorComponent,
    },
    {
        path: "error-list",
        component: ErrorProjectListComponent,
    },

];


@NgModule({
  declarations: [NestedFilterPipe,BuildingfloorComponent, BuildingWallComponent, FloorfinishloadComponent, ProjectSearchDropdownComponent, ErrorProjectListComponent],
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
    AppPipesModule,
    ScrollingModule
    ],
  entryComponents:[]
})
export class BuildingfloorModule { }

