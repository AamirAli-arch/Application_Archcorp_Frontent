import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import { TimeoffEmailService } from "../services/timeoff-email.service";
import { TimeOffRequest } from "../modal/timeOffTeams";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { MessageNotifierService } from "app/services/message-notifier.service";

@Component({
    selector: "app-timeoffemail",
    templateUrl: "./timeoffemail.component.html",
    styleUrls: ["./timeoffemail.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class TimeoffemailComponent implements OnInit {
    gettimeOffId: any;
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _messageNotification: MessageNotifierService,
        private _timeOffRequest: TimeoffEmailService,
        private _snackBar: MatSnackBar,
        private _activatedRoute: ActivatedRoute
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };
        this.gettimeOffId = this._activatedRoute.snapshot.params["id"];
    }

    ngOnInit() {
        this.gettimeOffId = 1;
        this._timeOffRequest
            .getEmployTimeOff(this.gettimeOffId)
            .subscribe((response: any) => {
              
            });
    }

    approveRequest() {
        const request = new TimeOffRequest();
        request.teamsId;
        request.timeOffId;
        this._timeOffRequest.applyTimeOff(request).subscribe(
            (response) => {
                if (response.errorMessage == null) {
                    this._messageNotification.successMessage(
                        response.successMessage
                    );
                }
            },
            (error) => {
                this._messageNotification.errorMessage(
                    error.error.errorMessage
                );
            }
        );
    }

    rejectRequest() {
        const request = new TimeOffRequest();
        request.teamsId;
        request.timeOffId;
        this._timeOffRequest.rejectTimeOff(request).subscribe(
            (response) => {
                if (response.errorMessage == null) {
                    this._messageNotification.successMessage(
                        response.successMessage
                    );
                }
            },
            (error) => {
                this._messageNotification.errorMessage(
                    error.error.errorMessage
                );
            }
        );
    }
}
