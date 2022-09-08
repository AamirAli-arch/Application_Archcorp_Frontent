import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { LoaderSpinerService } from 'app/main/pages/loader-spiner/loader-spiner.service';
import { MessageNotifierService } from 'app/services/message-notifier.service';
import { AddprjectComponent } from '../addprject/addprject.component';
import { AwardservicesService } from '../services/awardservices.service';

@Component({
  selector: 'app-details-contract',
  templateUrl: './details-contract.component.html',
  styleUrls: ['./details-contract.component.scss']
})
export class DetailsContractComponent implements OnInit {
    projectId:any;
  constructor(   private _Activatedroute: ActivatedRoute,
    private _service: AwardservicesService,
    public dialog: MatDialog,
    private _messageNotification: MessageNotifierService,
    private _loaderService: LoaderSpinerService) { }

  ngOnInit(): void {
  }

  addProject() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};
    dialogConfig.data = this.projectId;
    dialogConfig.panelClass = "projectassignComponent";
    const dialogRef = this.dialog.open(AddprjectComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
        if (data) {
            if (data.errorMessage == null) {

            }
        }
    });
}

}
