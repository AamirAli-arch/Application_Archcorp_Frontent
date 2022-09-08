import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';
import { TicketDeleteComponent } from './ticket-delete/ticket-delete.component';
import { TicketComponent } from './ticket.component';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path: "ticket",
        component: TicketComponent,
    },
];

@NgModule({
  declarations: [TicketComponent,TicketEditComponent, TicketDeleteComponent],
  imports: [CommonModule, FuseSharedModule, RouterModule.forChild(routes)],
  entryComponents:[TicketDeleteComponent,TicketEditComponent]
})
export class TicketModule { }
