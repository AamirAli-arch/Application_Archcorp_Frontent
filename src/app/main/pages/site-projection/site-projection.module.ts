import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SiteProjectionComponent } from './site-projection.component';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { ResourceViewerComponent } from './resource-viewer/resource-viewer.component';
import { ProjectViewerComponent } from './project-viewer/project-viewer.component';
import { AppPipesModule } from 'app/main/pipes/app-pipes.module';
import { MatTableExporterModule } from 'mat-table-exporter';

const routes = [
    {
        path: "resource-allocation",
        component: SiteProjectionComponent,
    },
    {
        path: "resource-viewer",
        component: ResourceViewerComponent,
    },

];

@NgModule({
  imports: [MatTableExporterModule,CommonModule, FuseSharedModule,  AppPipesModule,RouterModule.forChild(routes) ],
  declarations: [SiteProjectionComponent, AddResourceComponent, ResourceViewerComponent, ProjectViewerComponent],
  entryComponents:[AddResourceComponent,],
  providers: [DatePipe],
})
export class SiteProjectionModule { }




