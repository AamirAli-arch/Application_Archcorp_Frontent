import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { LoaderSpinerService } from "app/main/pages/loader-spiner/loader-spiner.service";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { FreshAirRequest, Level } from "../../modal/technical-card";
import { TechnicalCardsService } from "../../services/technical-cards.service";

@Component({
    selector: "app-mechanical-equipment",
    templateUrl: "./mechanical-equipment.component.html",
    styleUrls: ["./mechanical-equipment.component.scss"],
})
export class MechanicalEquipmentComponent implements OnInit {
    
    filterForm: FormGroup;
    noRecords = false;
    levelArray = [];
    equipmentListArray = [];
    equipmentTypeArray = [
        { name: "Mechanical Equipment", type: 2 },
        { name: "LandLord", type: 3 },
        { name: "Apartments & Retail Shop", type: 4 },
    ];
    dataSource = [];
    leveData = [];
    resultsLength = 0;
    rowAdded = [];
    listSpaceArray = [];
    projectId: any;
    levelMainArray = [];
    sumOfmechanicalArray = 0;
    sumOflandLoadArray = 0;
    sumOfapartmentArray = 0;
    parameterType = 2;
    landLoadArray = [];
    mechanicalArray = [];
    apartmentListArray = [];
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
            equipmentTypeId: new FormControl(),
            equipmentId: new FormControl(),
            qty: new FormControl(),
        });
        this.getParameterList();
        this.getEquipmentList();

        this.filterForm.controls["equipmentTypeId"].valueChanges.subscribe(
            (response: any) => {
                this.parameterType = response;
                    this.getParameterList();
                    this.getEquipmentList();
            }
        );
    }

    getEquipmentList(){
        this._services
        .getSpaceList(this.parameterType)
        .subscribe((response: any) => {
            this.equipmentListArray = response.parameters;
        });
    }
    getParameterList() {
        let request = new FreshAirRequest();
        request.projectId = this.projectId;
        request.technicalCardId = 2;
        this._services.getEquipmentValue(request).subscribe((response: any) => {
            if (response) {
                this.mechanicalArray=[];
                this.landLoadArray=[];
                this.apartmentListArray=[];
                this.leveData = response.equipments;
                this.leveData.forEach((element) => {
                    if(element.parameterTypeId===2){
                        this.mechanicalArray.push(element)
                    } else if(element.parameterTypeId===3){
                        this.landLoadArray.push(element)
                    } else{
                        this.apartmentListArray.push(element)
                    }
                });
             
                // Sum of the Mechanical, land Loard and Apartment
                this.sumOfmechanicalArray = 0;
                this.mechanicalArray.forEach((element) => {
                    this.sumOfmechanicalArray += element.quantity*element.load;
                });
                this.sumOflandLoadArray = 0;
                this.landLoadArray.forEach((element) => {
                    this.sumOflandLoadArray += element.quantity*element.load;
                });
                this.sumOfapartmentArray = 0;
                this.apartmentListArray.forEach((element) => {
                    this.sumOfapartmentArray += element.quantity*element.load;
                });
            }
        });
    }


    // Add addEquipmentValue
    addEquipment() {
        if (this.filterForm.valid) {
            let request = new FreshAirRequest();
            request.projectId = this.projectId;
            request.technicalCardId = 2;
            request.parameterType = this.parameterType;
            request.parameterId =
                this.filterForm.controls["equipmentId"].value == null
                    ? 1
                    : this.filterForm.controls["equipmentId"].value;
            request.quantity =
                this.filterForm.controls["qty"].value == null
                    ? 1
                    : this.filterForm.controls["qty"].value;
            this._loaderService.show();
            this._services.addEquipmentValue(request).subscribe(
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
        this.addEquipment();
    }
    // Update Parameter
    updateParamterValue(quantity, parameterId, load) {
        let request = new FreshAirRequest();
        request.projectId = this.projectId;
        request.id = parameterId;
        request.quantity = quantity;
        request.load=load;
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
    updateAreaValue(quantity, parameterId, load) {
        this.updateParamterValue(quantity, parameterId, load);
    }
}
