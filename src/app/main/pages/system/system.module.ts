import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

import { SystemComponent } from './system.component';
import { SystemAddComponent } from './system-add/system-add.component';


const routes = [
    {
        path:"system/:id",
        component: SystemComponent
    }
  ];

@NgModule({
  declarations: [SystemComponent, SystemAddComponent],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
  ],
  entryComponents:[SystemAddComponent,],
})
export class SystemModule { }
