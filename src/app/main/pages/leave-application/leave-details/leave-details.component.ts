import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EmpLeaveDetails } from "../models/leave-application";
import { LeaveService } from "../services/leave.service";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ApproveLeavesRequest } from "../models/leave-application";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { MessageNotifierService } from "app/services/message-notifier.service";

const moment = extendMoment(Moment);

export class LeaveDetails {
    type: string;
    status: number;
    startDate: string;
    endDate: string;
    empName: string;
}
@Component({
    selector: "app-leave-details",
    templateUrl: "./leave-details.component.html",
    styleUrls: ["./leave-details.component.scss"],
})
export class LeaveDetailsComponent implements OnInit {
    leaveId;
    leaveDetails: EmpLeaveDetails = new EmpLeaveDetails();
    validations: any[] = [];

    usedHolidays: number;
    totalHolidays: number;
    applyLeaveNumber: number;
    remainingLeaveNumber: number;
    requestedDays: number;
    leaveApply: FormGroup;
    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private _leaveService: LeaveService,
        private router: Router,private _messageNotification:MessageNotifierService,
        private _loaderService: LoaderSpinerService
    ) {
        this.route.params.subscribe((params) => {
            this.leaveId = params["id"];
        });
    }

    ngOnInit(): void {
        this.leaveApply = this.fb.group({
            startDate: new FormControl({value: null, disabled: true}),
            endDate: new FormControl({value: null, disabled: true}),
        });
        this._loaderService.show();
        this._leaveService
            .getLeaveDetails(this.leaveId)
            .subscribe((response) => {
                this.leaveDetails = response.leave;
                const startDate = moment(this.leaveDetails.startDate);
                const endDate = moment(this.leaveDetails.endDate);
                this.leaveApply.patchValue({
                    startDate: startDate,
                    endDate: endDate,
                });

                this.requestedDays = endDate.diff(startDate, "days");
                this._leaveService
                    .getLeavesBank(
                        this.leaveDetails.leaveTypeId,
                        this.leaveDetails.employeeId
                    )
                    .subscribe((response) => {
                        this.usedHolidays = response.leaveBank.used;
                        this.totalHolidays = response.leaveBank.balance;
                        this.applyLeaveNumber = this.getTotalDays(
                            startDate,
                            endDate
                        );
                        if (this.usedHolidays < this.totalHolidays) {
                            this.validations.push({
                                message:
                                    "Staff is within their remaining leaves",
                                type: "check_circle",
                                color: "primary",
                            });
                        } else {
                            this.validations.push({
                                message:
                                    "Staff is exceeding their remaining leaves",
                                type: "info",
                                color: "warn",
                            });
                        }
                        //this.remainingLeaveNumber = this.totalHolidays - this.usedHolidays;
                    });
                this.validations.splice(0, this.validations.length);
                this._leaveService
                    .getValidations(
                        this.leaveDetails.startDate,
                        this.leaveDetails.endDate,
                        this.leaveDetails.employeeId
                    )
                    .subscribe((detailResponse) => {
                     
                        this._loaderService.hide();
                        if (detailResponse.resourceSchedule.length > 0) {
                            this.validations.push({
                                message:
                                    "Staff is assigned task on selected dates",
                                type: "info",
                                color: "warn",
                            });
                        }

                    });
            });
    }

    approveLeave() {
        const request = new ApproveLeavesRequest();
        request.id = this.leaveId;
        request.actualStartDate = this.leaveApply.get("startDate").value;
        request.approvedEndDate = this.leaveApply.get("endDate").value;
        this._loaderService.show();
        this._leaveService.approveLeave(request).subscribe(
            (response) => {
                this._loaderService.hide();
                this._messageNotification.successMessage(response.successMessage);
                this.router.navigate(["pages/leave-summary"]);
            },
            (error) => {
                this._loaderService.hide();
                this._messageNotification.errorMessage(error.error.errorMessage);
            }
        );
    }

    rejectLeave() {
        const request = new ApproveLeavesRequest();
        request.id = this.leaveId;
        this._loaderService.show();
        this._leaveService.declineLeave(request).subscribe(
            (response) => {
                this._loaderService.hide();
                this._messageNotification.successMessage(response.successMessage);
                this.router.navigate(["pages/leave-summary"]);
            },
            (error) => {
                this._loaderService.hide();
                this._messageNotification.errorMessage(error.error.errorMessage);
            }
        );
    }
    getTotalDays(startDate, endDate) {
        if (startDate && endDate) {
            let diff = endDate.diff(startDate, "days");
            this.applyLeaveNumber = diff + 1;
            return diff + 1;
        } else {
            return "";
        }
    }
}
