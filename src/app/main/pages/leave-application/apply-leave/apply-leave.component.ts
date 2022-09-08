import { DatePipe } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { MessageNotifierService } from "app/services/message-notifier.service";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { LeaveApply } from "../models/leave-application";
import { LeaveService } from "../services/leave.service";
const moment = extendMoment(Moment);

@Component({
    selector: "app-apply-leave",
    templateUrl: "./apply-leave.component.html",
    styleUrls: ["./apply-leave.component.scss"],
})
export class ApplyLeaveComponent implements OnInit {
    usedHolidays: number;
    totalHolidays: number;
    applyLeaveNumber: number;
    remainingLeaveNumber: number;
    minDate: Date;
    noBalance: boolean = false;
    errorMessage: any;
    getdate;
    validations: any[] = [];
    toDate = new Date();
    minTime;
    maxTime;
    range = new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
    });
    dateDiffrence: any;
    leaveApplicationForm: FormGroup;
    leaveValue = [
        { id: 1, name: "First Half" },
        { id: 2, name: "Second Half" },
    ];
    leaveSecondValue = [
        { id: 3, name: "First Half" },
        { id: 4, name: "Second Half" },
    ];
    isLoadingResults = false;
    getTotalNumberDay: number;
    constructor(
        private router: Router,
        private datePipe: DatePipe,
        private fb: FormBuilder,
        private _leaveService: LeaveService,
        private _messageNotification: MessageNotifierService,
        private _snackBar: MatSnackBar,
        private _loaderService: LoaderSpinerService
    ) {}

    ngOnInit(): void {
        this.leaveApplicationForm = this.fb.group({
            range: new FormGroup({
                start: new FormControl("", Validators.required),
                end: new FormControl("", Validators.required),
            }),
            type: new FormControl("", Validators.required),
            start: new FormControl("", Validators.required),
            end: new FormControl("", Validators.required),
            reason: new FormControl("", Validators.required),
            dateSelect: new FormControl("", Validators.required),
            startDateTime: new FormControl("", Validators.required),
            endDateTime: new FormControl("", Validators.required),
            firstHalf: new FormControl(1),
            secondHalf: new FormControl(2),
        });

        // First time set the value of start time
        const setnew = this.toDate.toISOString();
        const getdate = this.datePipe.transform(setnew, "HH:mm");
        this.minTime = getdate;

        this.leaveApplicationForm.get("type").valueChanges.subscribe((val) => {
            if (val == 1 || val == 2 || val == 4) {
                this._leaveService.getLeavesBank(val, 0).subscribe(
                    (response) => {
                        this.usedHolidays = response.leaveBank.used;
                        this.totalHolidays = response.leaveBank.balance;
                        //this.remainingLeaveNumber = this.totalHolidays - this.usedHolidays;
                    },
                    (error) => {
                        this.noBalance = true;
                        this.errorMessage = error.error.errorMessage;
                    }
                );
            }
        });

    }
    //time get
    startTime(time) {
        this.minTime = time;
    }
    onChangefirstHalf(event) {
        let getEvent;
        if (event.value) {
            getEvent = event.value;
        } else {
            getEvent = event;
        }
        const startDate: any = moment(
            this.fixDate(this.leaveApplicationForm.get("range").value.start),
            "DD-MMM-YYYY"
        );
        const endDate: any = moment(
            this.fixDate(this.leaveApplicationForm.get("range").value.end),
            "DD-MMM-YYYY"
        );
        if (startDate.isSame(endDate)) {
            // this.getTotalNumberDay = this.getTotalNumberDay;
            if (
                this.leaveApplicationForm.get("firstHalf").value == 1 &&
                this.leaveApplicationForm.get("secondHalf").value == 1
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay - 0.5;
            } else if (
                this.leaveApplicationForm.get("firstHalf").value == 1 &&
                this.leaveApplicationForm.get("secondHalf").value == 2
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay + 0.5;
            } else if (
                this.leaveApplicationForm.get("firstHalf").value == 2 &&
                this.leaveApplicationForm.get("secondHalf").value == 1
            ) {
                if (this.getTotalNumberDay == 0.5) {
                    this.getTotalNumberDay = this.getTotalNumberDay;
                } else {
                    this.getTotalNumberDay = this.getTotalNumberDay - 0.5;
                }
            } else if (
                this.leaveApplicationForm.get("firstHalf").value == 2 &&
                this.leaveApplicationForm.get("secondHalf").value == 2
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay - 0.5;
            }
            if (getEvent == 2) {
                this.leaveApplicationForm.controls["secondHalf"].setValue(2);
                this.leaveApplicationForm.get("secondHalf").disable();
            } else {
                this.leaveApplicationForm.get("secondHalf").enable();
            }
        } else {
            this.leaveApplicationForm.get("secondHalf").enable();
            if (
                this.leaveApplicationForm.get("firstHalf").value == 1 &&
                this.leaveApplicationForm.get("secondHalf").value == 1
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay + 0.5;
            } else if (
                this.leaveApplicationForm.get("firstHalf").value == 1 &&
                this.leaveApplicationForm.get("secondHalf").value == 2
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay + 0.5;
            } else if (
                this.leaveApplicationForm.get("firstHalf").value == 2 &&
                this.leaveApplicationForm.get("secondHalf").value == 1
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay - 0.5;
            } else if (
                this.leaveApplicationForm.get("firstHalf").value == 2 &&
                this.leaveApplicationForm.get("secondHalf").value == 2
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay - 0.5;
            }
        }

    }
    onChangesecondHalf(event) {
        const startDate: any = moment(
            this.fixDate(this.leaveApplicationForm.get("range").value.start),
            "DD-MMM-YYYY"
        );
        const endDate: any = moment(
            this.fixDate(this.leaveApplicationForm.get("range").value.end),
            "DD-MMM-YYYY"
        );
        if (startDate.isSame(endDate)) {
            if (
                this.leaveApplicationForm.get("firstHalf").value == 1 &&
                this.leaveApplicationForm.get("secondHalf").value == 1
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay - 0.5;
            } else if (
                this.leaveApplicationForm.get("firstHalf").value == 1 &&
                this.leaveApplicationForm.get("secondHalf").value == 2
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay + 0.5;
            } else if (
                this.leaveApplicationForm.get("firstHalf").value == 2 &&
                this.leaveApplicationForm.get("secondHalf").value == 1
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay - 0.5;
            } else if (
                this.leaveApplicationForm.get("firstHalf").value == 2 &&
                this.leaveApplicationForm.get("secondHalf").value == 2
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay + 0.5;
            }
        } else {
            if (
                this.leaveApplicationForm.get("firstHalf").value == 1 &&
                this.leaveApplicationForm.get("secondHalf").value == 1
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay - 0.5;
            } else if (
                this.leaveApplicationForm.get("firstHalf").value == 1 &&
                this.leaveApplicationForm.get("secondHalf").value == 2
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay + 0.5;
            } else if (
                this.leaveApplicationForm.get("firstHalf").value == 2 &&
                this.leaveApplicationForm.get("secondHalf").value == 1
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay - 0.5;
            } else if (
                this.leaveApplicationForm.get("firstHalf").value == 2 &&
                this.leaveApplicationForm.get("secondHalf").value == 2
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay + 0.5;
            }
        }
    }

    dateRangeChange(
        dateRangeStart: HTMLInputElement,
        dateRangeEnd: HTMLInputElement
    ) {
        const startDate = this.fixDate(dateRangeStart.value);
        const endDate = this.fixDate(dateRangeEnd.value);
        if (
            this.leaveApplicationForm.get("type").value &&
            dateRangeStart.value != "" &&
            dateRangeEnd.value != ""
        ) {
            this.validations.splice(0, this.validations.length);
            this._leaveService
                .getValidations(startDate, endDate, 0)
                .subscribe((response) => {
                    if (response.resourceSchedule.length > 0) {
                        this.validations.push({
                            message: "You're assigned task on selected dates",
                            type: "info",
                            color: "warn",
                        });
                    }
                    if (this.applyLeaveNumber <= this.totalHolidays) {
                        this.validations.push({
                            message: "You're within your remaining leaves",
                            type: "check_circle",
                            color: "green",
                        });
                    } else {
                        this.validations.push({
                            message: "You're exceeding your remaining leaves",
                            type: "info",
                            color: "warn",
                        });
                    }
                });
        }
        this.getTotalDays(dateRangeStart, dateRangeEnd);
    }

    onSubmit() {
        if (this.leaveApplicationForm.get("type").value != 7) {
            if (
                this.leaveApplicationForm.get("type").value &&
                this.leaveApplicationForm.get("range").value.start &&
                this.leaveApplicationForm.get("range").value.end &&
                this.leaveApplicationForm.get("reason").value
            ) {
                const newRequest = new LeaveApply();
                newRequest.leaveType =
                    this.leaveApplicationForm.get("type").value;
                newRequest.startDate = this.fixDate(
                    this.leaveApplicationForm.get("range").value.start
                );
                newRequest.endDate = this.fixDate(
                    this.leaveApplicationForm.get("range").value.end
                );
                newRequest.reason =
                    this.leaveApplicationForm.get("reason").value;
                newRequest.startingHalf =
                    this.leaveApplicationForm.get("firstHalf").value;
                newRequest.endingHalf =
                    this.leaveApplicationForm.get("secondHalf").value;
                this._loaderService.show();
                this._leaveService.applyLeave(newRequest).subscribe(
                    (response) => {
                        this._loaderService.hide();
                        this._messageNotification.successMessage(
                            response.successMessage
                        );
                        this.router.navigate(["pages/myleave-request"]);

                        this.leaveApplicationForm.reset();
                    },
                    (error) => {
                        this._loaderService.hide();
                        this._messageNotification.errorMessage(
                            error.error.errorMessage
                        );
                    }
                );
            } else {
                this._loaderService.hide();
                // this._messageNotification.warningMessage("Please select LeaveType , Select Days to proceed");
            }
        } else {
            if (
                this.leaveApplicationForm.get("type").value &&
                this.leaveApplicationForm.get("startDateTime").value &&
                this.leaveApplicationForm.get("endDateTime").value &&
                this.leaveApplicationForm.get("reason").value
            ) {
                const timeRequest = new LeaveApply();
                timeRequest.reason =
                    this.leaveApplicationForm.get("reason").value;
                timeRequest.date = this.fixDate(
                    this.leaveApplicationForm.get("dateSelect").value
                );
                timeRequest.start =
                    this.leaveApplicationForm.get("startDateTime").value;
                timeRequest.end =
                    this.leaveApplicationForm.get("endDateTime").value;
                this._loaderService.show();
                this._leaveService.applyTimeoffLeave(timeRequest).subscribe(
                    (response) => {
                        this._loaderService.hide();
                        this._messageNotification.successMessage(
                            response.successMessage
                        );
                        this.router.navigate(["pages/timeoff-leaves"]);
                        this.leaveApplicationForm.reset();
                    },
                    (error) => {
                        this._loaderService.hide();
                        this._messageNotification.errorMessage(
                            error.error.errorMessage
                        );
                    }
                );
            } else {
                this._loaderService.hide();
                //this._messageNotification.warningMessage("Please select LeaveType , Select Days to proceed");
            }
        }
    }

    getWorkingDays(range) {
        const start = range.get("start").value;
        const end = range.get("end").value;
        if (start && end) {
            const days = this.calculateWorkingDays(start, end);
            return days;
        } else {
            return "";
        }
    }

    getTotalDays(
        dateRangeStart: HTMLInputElement,
        dateRangeEnd: HTMLInputElement
    ) {
        const start = moment(dateRangeStart.value);
        const end = moment(dateRangeEnd.value);
        if (start && end) {
            let diff = end.diff(start, "days");
            this.dateDiffrence = diff;
            this.applyLeaveNumber = diff + 1;
            // calcluate the first and 2nd half then i add 0.5 in total day
            this.getTotalNumberDay = diff + 1;
        }
        const getDiff = moment(end).diff(moment(start), "days");
        if (getDiff == 0 && moment(start).isSame(moment(end))) {
            if (
                this.leaveApplicationForm.get("firstHalf").value == 1 &&
                this.leaveApplicationForm.get("secondHalf").value == 1
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay - 0.5;
            } else if (
                this.leaveApplicationForm.get("firstHalf").value == 1 &&
                this.leaveApplicationForm.get("secondHalf").value == 2
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay;
            } else if (
                this.leaveApplicationForm.get("firstHalf").value == 2 &&
                this.leaveApplicationForm.get("secondHalf").value == 1
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay - 0.5;
                this.leaveApplicationForm.controls["secondHalf"].setValue(2);
                this.leaveApplicationForm.get("secondHalf").disable();
            } else if (
                this.leaveApplicationForm.get("firstHalf").value == 2 &&
                this.leaveApplicationForm.get("secondHalf").value == 2
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay - 0.5;
                this.leaveApplicationForm.controls["secondHalf"].setValue(2);
                this.leaveApplicationForm.get("secondHalf").disable();
            }
        } else {

            if (
                this.leaveApplicationForm.get("firstHalf").value == 1 &&
                this.leaveApplicationForm.get("secondHalf").value == 1
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay - 0.5;
            } else if (
                this.leaveApplicationForm.get("firstHalf").value == 1 &&
                this.leaveApplicationForm.get("secondHalf").value == 2
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay;
            } else if (
                this.leaveApplicationForm.get("firstHalf").value == 2 &&
                this.leaveApplicationForm.get("secondHalf").value == 1
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay -1;
            } else if (
                this.leaveApplicationForm.get("firstHalf").value == 2 &&
                this.leaveApplicationForm.get("secondHalf").value == 2
            ) {
                this.getTotalNumberDay = this.getTotalNumberDay - 0.5;
            }
        }
    }

    calculateWorkingDays(startDate, endDate) {
        var day = moment(startDate);
        var businessDays = 0;

        while (day.isSameOrBefore(endDate, "day")) {
            if (day.day() != 5 && day.day() != 6) businessDays++;
            day.add(1, "d");
        }
        return businessDays;
    }

    fixDate(date) {
        date = new Date(date);
        let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
        let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
        date.setHours(hoursDiff);
        date.setMinutes(minutesDiff);
        return date;
    }
}
