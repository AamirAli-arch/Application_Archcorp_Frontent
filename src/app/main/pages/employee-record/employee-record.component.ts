import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ConsoleLogger } from "@microsoft/signalr/dist/esm/Utils";
import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { LoaderSpinerService } from "../loader-spiner/loader-spiner.service";
import { ProfileService } from "../profile/services/profile.service";
import {
    ReportsRequest,
} from "../reports/models/reportsRequest";
import { ReportsService } from "../reports/services/reports.service";
import { DeletModalPopupComponent } from "./delet-modal-popup/delet-modal-popup.component";
import { EmployeeRecordEditComponent } from "./employee-record-edit/employee-record-edit.component";
import { EmployeeRegisterComponent } from "./employee-register/employee-register.component";
import { EmployeesRecord, UpdateEmployeeRequest } from "./modal/employee";
import { EmployeeService } from "./services/employee.service";

@Component({
    selector: "app-employee-record",
    templateUrl: "./employee-record.component.html",
    styleUrls: ["./employee-record.component.scss"],
})
export class EmployeeRecordComponent implements OnInit {
    filterForm: FormGroup;
    displayedColumns = [
        "name",
        "email",
        "workLocation",
        "employmentStatus",
        "status",
        "action",    
    ];
    resultsLength = 0;
    filteredAndPaged: Observable<EmployeesRecord[]>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    edtidelte = -1;
    griddata: any;
    url: "assets/images/avatars/profile.jpg";
    employees = [];
    setActive = 1;
    degisationList;
    workLocation = [
        { name: "Office", id: 1 },
        { name: "Site", id: 2 },
    ];
    employeeStatus = [
        { name: "OnWork", id: 1 },
        { name: "OnLeave", id: 2 },
    ];
    employmentStatus = [
        { name: "Consultant", id: 1 },
        { name: "Intern", id: 2 },
        { name: "OnContract", id: 3 },
        { name: "Permanent", id: 4 },
        { name: "Temporary", id: 5 },
        { name: "Trainee", id: 6 },
        { name: "Probation", id: 7 },
    ];
    getId:any=[];
    constructor(
        private _snackBar: MatSnackBar,
        private _reportsService: ReportsService,
        private _loaderService: LoaderSpinerService,
        private _service: EmployeeService,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private router: Router,
        private _services: EmployeeService,
        private _profileService:ProfileService
    ) {}
    ngOnInit(): void {
        this.filterForm = this.fb.group({
            employeeId: new FormControl([]),
            designation: new FormControl(),
            worklocation: new FormControl(),
            employeeStatus: new FormControl(),
            status: new FormControl(),
        });

        this._reportsService.getEmployees().subscribe((response) => {
            this.employees = response.employees;
        });
        this._services.getDesignationsList().subscribe((response: any) => {
            if (response) {
                this.degisationList = response.designations;
            }
        });
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            // call API first time
            this.getEmployeesList();
        });
    }
    getEmployeeId(id){
        if(id){
            this.router.navigate(["pages/profile",id]);
            
        }
    }
    getEmployeValue(data: any) {
        this.getId = data;        
        this.getEmployeesList();
    }
    getEmployeesList() {
        this.filteredAndPaged = merge(
            // this.filterForm.get("employeeId").valueChanges
            this.filterForm.get("designation").valueChanges,
            this.filterForm.get("worklocation").valueChanges,
            this.filterForm.get("employeeStatus").valueChanges,
            this.filterForm.get("status").valueChanges,
        ).pipe(
            startWith({}),
            switchMap(() => {
                const request = new EmployeesRecord();
                request.employeeIds =this.getId;
                request.designation= this.filterForm.controls['designation'].value == null ? 0 : this.filterForm.controls['designation'].value;
                request.workLocation= this.filterForm.controls['worklocation'].value == null ? 0 : this.filterForm.controls['worklocation'].value;
                request.employmentStatus = this.filterForm.controls['employeeStatus'].value == null ? 0 :this.filterForm.controls['employeeStatus'].value;
                request.status = this.filterForm.controls['employeeStatus'].value == null ? 0 : this.filterForm.controls['employeeStatus'].value;
                this._loaderService.show();
                return this._service.getEmployeeList(request);
            }),
            map((data) => {
                this._loaderService.hide();
                return data.employees;
            }),
            catchError(() => {
                this._loaderService.hide();
                return observableOf([]);
            })
        );
        this.filteredAndPaged.subscribe((response:any) =>{
            this.griddata=response
        })
    }

    editDelete(index) {
        if (this.edtidelte === index) {
            this.edtidelte = -1;
        } else {
            this.edtidelte = index;
        }
    }
    buttonActive(id) {
        if (id == 1) {
            this.setActive = 1;
        } else {
            this.setActive = 2;
        }
    }
    employeeAddEdit() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {};
        dialogConfig.panelClass = "projectassignComponent";

        const dialogRef = this.dialog.open(
            EmployeeRecordEditComponent,
            dialogConfig
        );
        this.edtidelte = -1;
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                }
            }
        });
    }

    employeeRegister() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = null;
        dialogConfig.panelClass = "projectassignComponent";

        const dialogRef = this.dialog.open(EmployeeRegisterComponent,dialogConfig );
        this.edtidelte = -1;
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                    this.getEmployeesList();
                }
            }
        });
    }

    deleteEmployee() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {};
        dialogConfig.panelClass = "taskallocation";

        const dialogRef = this.dialog.open(
            DeletModalPopupComponent,
            dialogConfig
        );
        this.edtidelte = -1;
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                }
            }
        });
    }

    attendance() {
        this.router.navigate(["pages/employeeadd"]);
    }


    updatePersonalInfo(id){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = id;        
        dialogConfig.panelClass = "employee-register";

        const dialogRef = this.dialog.open(
            EmployeeRegisterComponent,
            dialogConfig
        );
        //this.edtidelte = -1;

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                    this.getEmployeesList();
                }
            }
           
        });
       
    }

}
