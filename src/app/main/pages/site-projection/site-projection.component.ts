import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { MatSnackBar } from "@angular/material/snack-bar";

import * as moment from "moment";
import { LoaderSpinerService } from "../loader-spiner/loader-spiner.service";
import { ReportsService } from "../reports/services/reports.service";
import { SelectionModel } from "@angular/cdk/collections";
import { AddResourceComponent } from "./add-resource/add-resource.component";
import { ResourceService } from "./service/resource.service";
import { ResourceRequest } from "./models/resource-request";
import { MatTableDataSource } from "@angular/material/table";
import { project } from './../dashboard/project/data';
import { MessageNotifierService } from "app/services/message-notifier.service";
import { DeletePopupComponent } from "../delete-popup/delete-popup.component";

@Component({
    selector: "app-site-projection",
    templateUrl: "./site-projection.component.html",
    styleUrls: ["./site-projection.component.scss"],
})
export class SiteProjectionComponent implements OnInit {
    moment = moment;
    //Leave Request Table Data
    displayedColumns = [
        "select",
        "Name",
        "resource",
        "start",
        "end",
        "weekOfYear",
        "contract",
        "percentage",
        "planned",
    ];
   // dataSource: ResourceService | null;
   dataSource;
    searchProjectName = "";
    resultsLength = 0;
    filteredAndPaged: Observable<ResourceRequest[]>;
    filterForm: FormGroup;
    isLoadingResults = true;
    getNotificationId: any;
    hideShow = false;
    projectArray: any;
    employees:any=[];
    employeeArray:any;
    project_Id:any;
    monthArray = [
        { name: "January", value: 1 },
        { name: "February", value: 2 },
        { name: "March", value: 3 },
        { name: "April", value: 4 },
        { name: "May", value: 5 },
        { name: "June", value: 6 },
        { name: "July", value: 7 },
        { name: "August", value: 8 },
        { name: "September", value: 9 },
        { name: "October", value: 10 },
        { name: "November", value: 11 },
        { name: "December", value: 12 },
    ];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('search') inputName;
    selection = new SelectionModel<SiteProjectionComponent>(true, []);
    entryIdSelect:any=[];
    employeeId;
    filterArray:any=[];
    constructor(
        private _snackBar: MatSnackBar,private _messageNotification:MessageNotifierService  ,
        private _loaderService: LoaderSpinerService,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private _service: ResourceService,
        private _reportsService: ReportsService,
        private _httpClient: HttpClient
    ) {}
    ngOnInit(): void {
        this.filterForm = this.fb.group({
            project: new FormControl([]),
            years: new FormControl([]),
            month: new FormControl([]),
            resource: new FormControl([]),
        });
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getSiteList();
        }, 0);
    }

    applyFilter(filterText: string) {
        let filteredTreeData;
        if(filterText){
            filteredTreeData = this.dataSource.filter(d => d.projectName.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1);
            this.filteredAndPaged = filteredTreeData;
        } else{
            this.filteredAndPaged=this.dataSource;
        }
      }
    getSiteList() {
        //this.dataSource = new ResourceService(this._httpClient);
        this.filteredAndPaged = merge(
            this.paginator.page,
            // this.filterForm.get("project").valueChanges,
            this.filterForm.get("years").valueChanges,
            this.filterForm.get("month").valueChanges,
        ).pipe(
            startWith({}),
            switchMap(() => {
                const request = new ResourceRequest();
                request.currentPage = this.paginator.pageIndex + 1;
                request.pageSize = this.paginator.pageSize;
                request.projectIds =  this.project_Id;
                request.employeeIds = this.employeeId;
                request.months = this.filterForm.get("month").value;
                request.years = this.filterForm.get("years").value;
                this._loaderService.show();
                return this._service.getSiteResourceList(request);
            }),
            map((data) => {
                this._loaderService.hide();
                this.hideShow = true;
                this.dataSource=data.allocations;
                this.resultsLength = data.totalCount;
                return data.allocations;
            }),
            catchError(() => {
                this._loaderService.hide();
                return observableOf([]);
            })
        );
       // this.dataSource=this.filteredAndPaged;
        //this.dataSource.filter
    }

    projectId(Id:any){
        this.project_Id=Id;
        this.getSiteList();
    }

    fixDate(date) {
        date = new Date(date);
        let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
        let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
        date.setHours(hoursDiff);
        date.setMinutes(minutesDiff);
        return date;
    }

    getEmployeValue(data:any){
        this.employeeId=data;
        this.getSiteList();
    }
    addResource() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {};
        dialogConfig.panelClass = "projectassignComponent";

        const dialogRef = this.dialog.open(AddResourceComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.getSiteList();
            }
        });
    }
    deleteEntry(){
       
        if(this.entryIdSelect.length>0){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.panelClass = "delete-modal";
        const dialogRef = this.dialog.open(
            DeletePopupComponent,
            dialogConfig
        );
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                    const request = new ResourceRequest();
                    request.allocations=this.entryIdSelect;
                    this._loaderService.show();
                    this._service.deleteResource(request).subscribe(
                        (response) => {
                            this._loaderService.hide();
                            this._messageNotification.successMessage(response.successMessage);
                            this.selection.clear();
                            this.isAllSelected();
                            this.getSiteList();
                        },
                        (error) => {
                            this._loaderService.hide();
                            this._messageNotification.errorMessage(error.error.errorMessage);
                        }
                    );
            }
        });
        }else {
            this._messageNotification.warningMessage("Please Select Atleast One Project");
        }
    }


      /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    this.entryIdSelect=this.selection.selected 
    const numRows = this.dataSource.length;
     return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.forEach(row => this.selection.select(row.id));
  }
}

