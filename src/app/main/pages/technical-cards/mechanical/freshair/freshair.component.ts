import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { LoaderSpinerService } from "app/main/pages/loader-spiner/loader-spiner.service";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { FreshAirRequest, Level } from "../../modal/technical-card";
import { TechnicalCardsService } from "../../services/technical-cards.service";
import { update } from "lodash";

@Component({
    selector: "app-freshair",
    templateUrl: "./freshair.component.html",
    styleUrls: ["./freshair.component.scss"],
})
export class FreshairComponent implements OnInit {
    filterForm: FormGroup;
    noRecords = false;
    levelArray = [];
    spaceArray = [];

    dataSource = [];
    leveData = [];
    resultsLength = 0;
    rowAdded = [];
    listSpaceArray = [];
    projectId: any;
    levelMainArray = [];


    constructor(
        private fb: FormBuilder,
        private _Activatedroute: ActivatedRoute,
        public dialog: MatDialog,
        private router: Router,
        private _services: TechnicalCardsService,
        private _messageNotification: MessageNotifierService,
        private _loaderService: LoaderSpinerService
    ) {
        // this.projectId = this._Activatedroute.snapshot.paramMap.get("id");
        this.projectId = 1;
    }

    ngOnInit(): void {
        this.filterForm = this.fb.group({
            level: new FormControl(),
            space: new FormControl(),
            area: new FormControl(),
        });

        this._services.getLevalList().subscribe((response: any) => {
            if (response) {
                this.levelArray = response.levels;
            }
        });
        // for space
        const id = 1;
        this._services.getSpaceList(id).subscribe((response: any) => {
            this.spaceArray = response.parameters;
            this.getParameterList();
        });
    }

    getParameterList() {
   
        let request = new FreshAirRequest();
        request.projectId = this.projectId;
        request.technicalCardId = 1;
        this._services.getParamterValue(request).subscribe((response: any) => {
            if (response) {
                this.leveData = response.levels;
                this.leveData.forEach((element, j) => {
                    let sumOfArea = 0;
                    let sumOfTotalOutsideAir = 0;
                    let sumOfTotalExtractAir = 0;
                    element.parameters.forEach((spaceName, i) => {
                        this.spaceArray.forEach((space) => {
                            if (space.id == spaceName.parameterId) {
                                element.parameters[i].totalProposedOccupants =
                                    space.totalProposedOccupants;
                                element.parameters[i].airFlowBasedOnNoOfPeople =
                                    space.airFlowBasedOnNoOfPeople;
                                element.parameters[i].airRateBasedOnArea =
                                    space.airRateBasedOnArea;
                                element.parameters[i].noOfUnits =
                                    space.noOfUnits;
                                element.parameters[i].proposedExtract =
                                    space.proposedExtract;
                                element.parameters[i].proposedOutsideAir =
                                    space.proposedOutsideAir;
                            }
                        });
                        this.leveData[j].sumTotalOutsideAir =
                            sumOfTotalOutsideAir +=
                                spaceName.area * spaceName.airRateBasedOnArea +
                                spaceName.totalProposedOccupants *
                                    spaceName.airFlowBasedOnNoOfPeople +
                                spaceName.noOfUnits;
                        this.leveData[j].sumTotalExtractAir =
                            sumOfTotalExtractAir +=
                                spaceName.proposedOutsideAir *
                                spaceName.noOfUnits;
                        this.leveData[j].sumArea = sumOfArea += spaceName.area;
                    });
                });
            }
        });
    }
    // Add Parameter
    addParameter() {
        let request = new FreshAirRequest();
        request.projectId = this.projectId;
        request.technicalCardId = 1;
        request.parameterId =
            this.filterForm.controls["space"].value == null
                ? 1
                : this.filterForm.controls["space"].value;
        request.levelId =
            this.filterForm.controls["level"].value == null
                ? 1
                : this.filterForm.controls["level"].value;
        request.area =
            this.filterForm.controls["area"].value == null
                ? 0
                : this.filterForm.controls["area"].value;
        this._loaderService.show();
        this._services.addParamterValue(request).subscribe(
            (response: any) => {
                // console.log("response", response);
                this._loaderService.hide();
                if (response.errorMessage == null) {
                    this._messageNotification.successMessage(
                        response.successMessage
                    );
                    this.getParameterList();
                }
            },
            (error) => {
                // this.noRecords = false;
                this._loaderService.hide();
                this._messageNotification.errorMessage(
                    error.error.errorMessage
                );
            }
        );
    }

    // Update Parameter
    updateParamterValue(levelId, parameterId, areaValue) {
        let request = new FreshAirRequest();
        request.projectId = this.projectId;
        request.id = parameterId;
        request.levelId = levelId;
        request.area = areaValue;
        this._loaderService.show();
        this._services.updateParamterValue(request).subscribe(
            (response: any) => {
                // console.log("response", response);
                this._loaderService.hide();
                if (response.errorMessage == null) {
                    this._messageNotification.successMessage(
                        response.successMessage
                    );
                    this.getParameterList();
                }
            },
            (error) => {
                // this.noRecords = false;
                this._loaderService.hide();
                this._messageNotification.errorMessage(
                    error.error.errorMessage
                );
            }
        );
    }

    numberOnly(event): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (
            charCode > 31 &&
            (charCode < 48 || charCode > 57) &&
            charCode != 46
        ) {
            return false;
        }
        return true;
    }

    focusOutFunction() {
        this.addParameter();
    }

    updateAreaValue(levelId, parameterId, areaValue) {
        this.updateParamterValue(levelId, parameterId, areaValue);
    }
}
