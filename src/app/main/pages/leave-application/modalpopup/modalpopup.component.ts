import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageNotifierService } from 'app/services/message-notifier.service';
import { LoaderSpinerService } from '../../loader-spiner/loader-spiner.service';
import { LeaveService } from '../services/leave.service';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.scss']
})
export class ModalpopupComponent implements OnInit {
 
  leveType: string;
  title: string;
  leveId: number;
  comment: any;
  constructor(private _messageNotification:MessageNotifierService  ,private _leaveService: LeaveService, private _loaderService:LoaderSpinerService, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) data, public dialogRef: MatDialogRef<ModalpopupComponent>) {
  
    this.title = data.title;
    this.leveType = data.leveType;
    this.leveId = data.leaveId;
  }

  ngOnInit(): void {
  }
  save() {
    const request: any = {
      comments: this.comment,
      id: this.leveId
    }
    if (this.leveType === 'approve') {
        this._loaderService.show()
      this._leaveService.approveTimeLeave(request)
        .subscribe(
          (response: any) => {
            // this._loaderService.hide()
            this.dialogRef.close({ data: response });
            this._messageNotification.successMessage(response.successMessage);
          }, error => {
            // this._loaderService.hide()
            this._messageNotification.errorMessage(error.error.errorMessage);

          });
    } else {
        // this._loaderService.show()
      this._leaveService.rejectTimeLeave(request)
        .subscribe(
          (response: any) => {
            this._loaderService.hide()
            this.dialogRef.close({ data: response });
            this._messageNotification.successMessage(response.successMessage);
          }, error => {
            // this._loaderService.hide()
            this._messageNotification.errorMessage(error.error.errorMessage);

          });
    }
  }
  close() {
    this.dialogRef.close()
  }

}
