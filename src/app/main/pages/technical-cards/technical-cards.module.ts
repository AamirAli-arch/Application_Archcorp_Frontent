import { NgModule } from '@angular/core';
import { StructuralComponent } from './structural/structural.component';
import { DomesticWaterComponent } from './mechanical/domestic-water/domestic-water.component';
import { RouterModule } from '@angular/router';
import { FreshairComponent } from './mechanical/freshair/freshair.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/common/app-material/material.module';
import { MechanicalEquipmentComponent } from './mechanical/mechanical-equipment/mechanical-equipment.component';
import { NumberAnimationComponent } from './mechanical/number-animation/number-animation.component';
import { ApartmentLoadComponent } from './electrical/apartment-load/apartment-load.component';
import { TechnicalCardsComponent } from './technical-cards.component';

import { RendererComponent } from './mechanical/renderer/renderer.component';
import { FullwidthRendererComponent } from './mechanical/fullwidth-renderer/fullwidth-renderer.component';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';



const routes = [
  {
      path     : 'technical-card',
      component: TechnicalCardsComponent
  },
  {
    path     : 'fresh',
    component: FreshairComponent
  },
  {
    path     : 'mechanical',
    component: MechanicalEquipmentComponent
  },
   {
    path     : 'apartment',
    component: ApartmentLoadComponent
  },
  {
    path: 'domestic-water',
    component: DomesticWaterComponent
  }
]

@NgModule({
  declarations: [StructuralComponent, DomesticWaterComponent, FreshairComponent, MechanicalEquipmentComponent, NumberAnimationComponent, ApartmentLoadComponent, TechnicalCardsComponent, RendererComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    MaterialModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule
  ]
})
export class TechnicalCardsModule { }
