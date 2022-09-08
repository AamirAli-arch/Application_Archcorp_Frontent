import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
    MatDialogRef,
    MatDialog,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { ReportsService } from "../services/reports.service";
import * as Moment from 'moment';
import { extendMoment } from "moment-range";
import { DatePipe } from "@angular/common";
import { MessageNotifierService } from "app/services/message-notifier.service";
const moment = extendMoment(Moment);
@Component({
    selector: "app-report-timeupdate",
    templateUrl: "./report-timeupdate.component.html",
    styleUrls: ["./report-timeupdate.component.scss"],
})
export class ReportTimeupdateComponent implements OnInit {
    moment = moment;
    allocationForm: FormGroup;
    time: any;
    id: number;
    setDateobject:any;
    getdate;
    saveDateTime;
    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ReportTimeupdateComponent>,
        private dialog: MatDialog,
        private _reportsService: ReportsService,
        private _snackBar: MatSnackBar,
        private _loaderService: LoaderSpinerService,private _messageNotification:MessageNotifierService,
        @Inject(MAT_DIALOG_DATA) data ,private datePipe: DatePipe,
    ) {
        this.time = moment(data.time.checkIn).format("hh:mm a");
        this.getdate=data.time.checkIn;
        this.id=data.time.id;
    }

    ngOnInit(): void {
        this.allocationForm = this.fb.group({
            time: [this.time],
            comment: [""],
        });
    }
    onSubmit() {
        var minutes= this.allocationForm.controls['time'].value.split(':')[1];
        var hour = this.allocationForm.controls['time'].value.split(':')[0];
        if (this.allocationForm.valid) {
            const request = {
                id:this.id ,
                checkIn: moment(this.getdate, "YYYY-MM-DD HH:mm:ss").hour(parseInt(hour)).minute(parseInt(minutes)).format('YYYY-MM-DD HH:mm:ss'),
                comments: this.allocationForm.controls['comment'].value
            };
            this._loaderService.show();
            this._reportsService.checkInTime(request).subscribe(
                (respose:any) => {
                    if (respose.errorMessage == null) {
                        this._loaderService.hide();
                        this._messageNotification.successMessage(respose.successMessage);
                        this.dialogRef.close(respose);
                    }
                },
                (error) => {
                    this._loaderService.hide();
                    this._messageNotification.errorMessage(error.error.errorMessage);
                }
            );
        }
    }


    fixDate(date){
        date = new Date(date);
        let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
        let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
        date.setHours(hoursDiff);
        date.setMinutes(minutesDiff);
        return date;
      }


}
