import {
    Component,
    OnInit,
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatSelect } from "@angular/material/select";
import { LoaderSpinerService } from "app/main/pages/loader-spiner/loader-spiner.service";
import { MessageNotifierService } from "app/services/message-notifier.service";
import {
    ApartmentRequest,
    FreshAirRequest,
} from "../../modal/technical-card";
import { TechnicalCardsService } from "../../services/technical-cards.service";


interface ApartmentArray {
    name: string;
    load: [];
}

@Component({
    selector: "app-apartment-load",
    templateUrl: "./apartment-load.component.html",
    styleUrls: ["./apartment-load.component.scss"],
})
export class ApartmentLoadComponent implements OnInit {
    apartmentForm: FormGroup;
    apartmentArray = [];
    loadTypeArray = [];
    createNewArray: ApartmentArray[] = [];
    getlodaValue;
    apartMentName: string;
    parameterType = 4;
    loadType = 5;
    apartmentListArray = [];
    noSnumberValue = 0;
    projectId: number;
    spaceId: number;
    parameterId: number;
    elementsArray: any = [];
    constructor(
        private _services: TechnicalCardsService,
        private _loaderService: LoaderSpinerService,
        private fb: FormBuilder,
        private _messageNotification: MessageNotifierService
    ) {
        // this.projectId = this._Activatedroute.snapshot.paramMap.get("id");
        this.projectId = 1;
    }

    ngOnInit(): void {
        this.apartmentForm = this.fb.group({
            apartmentType: new FormControl(),
            loadType: new FormControl(),
        });
        this.getapartmentList();
        this.apartmentListForTable();
        this.apartmentForm.controls["apartmentType"].valueChanges.subscribe(
            (response: any) => {
                if (response) {
                    if (this.createNewArray.length > 0) {
                        this.createNewArray.forEach((element: any) => {
                            if (element.parameterId === response.id) {
                                this.spaceId = element.id;
                            }
                        });
                    } else {
                        this.spaceId = response.id;
                    }
                    this.parameterId = response.id;
                    this.getLoadTypeList();
                    //this.apartmentListForTable();
                    this.apartMentName = response.name;
                    // this.loadTypeArray=[];
                }
            }
        );

        //this.getLoadTypeList()
    }

    apartmentListForTable() {
        let request = new ApartmentRequest();
        request.projectId = this.projectId;
        request.technicalCardId = 3;
        this._services.apartmentList(request).subscribe(
            (response: any) => {
                this._loaderService.hide();
                if (response.errorMessage == null) {
                    this.createNewArray = response.appartments;
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

    getapartmentList() {
        this._services
            .getSpaceList(this.parameterType)
            .subscribe((response: any) => {
                this.apartmentArray = response.parameters;
            });
    }

    getLoadTypeList() {
        // this._loaderService.show();
        let request = new FreshAirRequest();
        request.projectId = this.projectId;
        request.spaceId = this.spaceId;
        request.parameterType = 5;
        this._services.getloadType(request).subscribe((response: any) => {
            this._loaderService.hide();
            this.loadTypeArray = response.elements;
            this.loadTypeArray.forEach((element, i) => {
                if (element) {
                    this.loadTypeArray[i].quantity = this.noSnumberValue;
                }
            });
        });
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

    onOptionsSelected(value) {
        let loadTypeArray = value;
        this.elementsArray=[];
        // console.log('top', this.createNewArray)
        if (this.apartMentName) {
            loadTypeArray.forEach((element) => {
                this.elementsArray.push({
                    projectId: this.projectId,
                    parameterId: element.id,
                    technicalCardId: 3,
                    quantity: element.nos,
                    load: element.load,
                });
            });
        } else {
            this._messageNotification.errorMessage("Select Apartment Type");
        }
    }

    add_Apartment(select: MatSelect) {
        if (this.elementsArray.length > 0) {
            let request = new ApartmentRequest();
            request.projectId = this.projectId;
            request.parameterId = this.parameterId;
            request.technicalCardId = 3;
            request.elements = this.elementsArray;
            this._loaderService.show();
            this._services.addApartment(request).subscribe(
                (response: any) => {
                    this._loaderService.hide();
                    if (response.errorMessage == null) {
                        this.apartmentListForTable();
                        this.elementsArray=[];
                        this.apartmentForm.controls["apartmentType"].setValue(
                            ""
                        );
                        this.apartmentForm.controls["loadType"].setValue("");
                        this._messageNotification.successMessage(
                            response.successMessage
                        );
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

  // Update Apartment
  update(quantity, parameterId, load) {
    let request = new ApartmentRequest();
    request.projectId = this.projectId;
    request.id = parameterId;
    request.quantity = quantity;
    request.load=load;
    this._loaderService.show();
    this._services.apartmentUpdate(request).subscribe(
        (response: any) => {
            // console.log("response", response);
            this._loaderService.hide();
            if (response.errorMessage == null) {
                this._messageNotification.successMessage(
                    response.successMessage
                );
                this.apartmentListForTable();
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
