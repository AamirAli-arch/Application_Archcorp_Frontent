import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { LoaderSpinerService } from "app/main/pages/loader-spiner/loader-spiner.service";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { BudgetedService } from "../services/budgeted.service";
import { FormControl, FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { EmployeeService } from "app/main/pages/employee-record/services/employee.service";
import { AddBudgetRequest, ResourceHour } from "../modal/budgeted";
import { DeletePopupComponent } from "app/main/pages/delete-popup/delete-popup.component";
import { AssignModalComponent } from "../assign-modal/assign-modal.component";
import { MatAccordion } from "@angular/material/expansion";


@Component({
    selector: "app-budgete-resource-allocation",
    templateUrl: "./budgete-resource-allocation.component.html",
    styleUrls: ["./budgete-resource-allocation.component.scss"],
})
export class BudgeteResourceAllocationComponent implements OnInit {
    @ViewChild("accordion", { static: true }) Accordion: MatAccordion;
    addBudgetForm: FormGroup;
    projectId: any;
    designationName: string;
    budgetedHours: number;
    budgetedHour: any;
    allocatedHours: number;
    remainingHours: number;
    degisationList: any;
    employeeArray = [];
    createdEmployeeList = [];
    hours: number = 0;
    resourceArray = [];
    designationId: any;
    hideShow: any;
    panelOpenState = false;
    flashcardInputExpanded: boolean = false;
    projectCost: number = 0;
    constructor(
        private _services: EmployeeService,
        private fb: FormBuilder,
        private _messageNotification: MessageNotifierService,
        private _loaderService: LoaderSpinerService,
        private _servicesBudgete: BudgetedService,
        public dialog: MatDialog,
        private _Activatedroute: ActivatedRoute
    ) {
        this.projectId = this._Activatedroute.snapshot.paramMap.get("id");
        // this.projectId=1
    }

    ngOnInit(): void {
        this.addBudgetForm = this.fb.group({
            designation: new FormControl(),
            employee: new FormControl(),
        });
        this.getlistofResource();
        this._services.getDesignationsList().subscribe((response: any) => {
            if (response) {
                this.degisationList = response.designations;
            }
        });

        this.addBudgetForm.controls["designation"].valueChanges.subscribe(
            (response: any) => {
                if (response) {
                    this.designationName = response.name;
                    let request = new AddBudgetRequest();
                    this.designationId = response.id;
                    this._servicesBudgete
                        .employeeByDesignation(this.designationId)
                        .subscribe((response: any) => {
                            if (response) {
                                this.employeeArray = response.employees;
                            }
                        });
                    this.cardHours();
                }
            }
        );

        this.addBudgetForm.controls["employee"].valueChanges.subscribe(
            (employee: any) => {
                this.createdEmployeeList = [];
                if (employee.length > 0) {
                    this.employeeArray.forEach((element) => {
                        // console.log('element', element)
                        employee.forEach((employeeId) => {
                            if (element.id == employeeId) {
                                this.createdEmployeeList.push({
                                    name: element.name,
                                    hours: this.hours,
                                    perHourSalary: element.perHourSalary,
                                    costHours: element.perHourSalary,
                                    employeeId: element.id,
                                    designationId: element.designationId,
                                });
                            }
                        });
                    });
                }
            }
        );
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            // call API first time
            // this.getlistofResource();
        }, 0);
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

    cardHours() {
        let request = new AddBudgetRequest();
        request.projectId = this.projectId;
        request.designationId = this.designationId;
        this._servicesBudgete
            .getBudgetedHour(request)
            .subscribe((response: any) => {
                if (response.budgetedHour) {
                    this.budgetedHour = response.budgetedHour;
                    this.budgetedHours = this.budgetedHour.budgetedHours;
                    this.allocatedHours = this.budgetedHour.allocatedHours;
                    this.remainingHours =
                        this.budgetedHours - this.allocatedHours;
                }
            });
    }

    assign(item) {
        if (item.hours > 0) {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.panelClass = "delete-modal";
            dialogConfig.data = "budgetedHours";
            const dialogRef = this.dialog.open(
                AssignModalComponent,
                dialogConfig
            );

            dialogRef.afterClosed().subscribe((data) => {
                if (data) {
                    let request = new ResourceHour();
                    request.projectId = this.projectId;
                    request.employeeId = item.employeeId;
                    request.designationId = item.designationId;
                    request.hours = item.hours;
                    this._servicesBudgete.addBudgetedHour(request).subscribe(
                        (respose: any) => {
                            if (respose.errorMessage == null) {
                                this.getlistofResource();
                                this.budgetedHours = 0;
                                this.hideShow = this.designationName;
                                this.addBudgetForm.controls[
                                    "designation"
                                ].setValue("");
                                this.addBudgetForm.controls[
                                    "employee"
                                ].setValue("");
                                this._messageNotification.successMessage(
                                    respose.successMessage
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
            });
        } else {
            // this.cardHours();
            // this.getlistofResource();
            this._messageNotification.errorMessage(
                "Allocate hours should be greater then zero"
            );
        }
    }

    getlistofResource() {
        this._servicesBudgete
            .getListResource(this.projectId)
            .subscribe((response: any) => {
                if (response) {
                    this.projectCost = 0;
                    this.resourceArray = response.resources;
                    this.resourceArray.forEach((resource) => {
                        resource.resourceHours.forEach((item, i) => {
                            this.projectCost += item.hours * item.perHourSalary;
                        });
                    });
                    // console.log('this.projectCost',this.projectCost)
                }
            });
    }
    open(Id) {
        this.hideShow = Id;
    }
    close(Id) {
        this.hideShow = Id;
    }
    updateResource(item) {
        this.hideShow = item.employeeId;
        if (item.hours > 0) {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.panelClass = "delete-modal";
            dialogConfig.data = "";
            const dialogRef = this.dialog.open(
                AssignModalComponent,
                dialogConfig
            );

            dialogRef.afterClosed().subscribe((data) => {
                if (data) {
                    let request = new ResourceHour();
                    request.id = item.id;
                    request.hours = item.hours;
                    this._servicesBudgete.updateResourceHour(request).subscribe(
                        (respose: any) => {
                            if (respose.errorMessage == null) {
                                this.getlistofResource();
                                this.addBudgetForm.controls[
                                    "designation"
                                ].setValue("");
                                this.addBudgetForm.controls[
                                    "employee"
                                ].setValue("");
                                this.budgetedHours = 0;
                                this._messageNotification.successMessage(
                                    respose.successMessage
                                );
                            }
                        },
                        (error) => {
                            this._messageNotification.errorMessage(
                                error.error.errorMessage
                            );
                        }
                    );
                } else {
                    this.getlistofResource();
                }
            });
        } else {
            this.getlistofResource();
            this._messageNotification.errorMessage(
                "Allocate hours should be greater then zero"
            );
        }
    }

    deleteCard(item) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.panelClass = "delete-modal";
        // dialogConfig.data = "deleteCard";
        const dialogRef = this.dialog.open(DeletePopupComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this._servicesBudgete.deleteResourceCard(item).subscribe(
                    (respose: any) => {
                        if (respose.errorMessage == null) {
                            this.getlistofResource();
                            this.addBudgetForm.controls["designation"].setValue(
                                ""
                            );
                            this.addBudgetForm.controls["employee"].setValue(
                                ""
                            );
                            this.budgetedHours = 0;
                            this._messageNotification.successMessage(
                                respose.successMessage
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
        });
    }
}
