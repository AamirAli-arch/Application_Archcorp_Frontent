import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { LoaderSpinerService } from "../loader-spiner/loader-spiner.service";
import { SystemService } from "./services/system.service";
import { SystemAddComponent } from "./system-add/system-add.component";
import { saveAs } from "file-saver";

@Component({
    selector: "app-system",
    templateUrl: "./system.component.html",
    styleUrls: ["./system.component.scss"],
})
export class SystemComponent implements OnInit {
    deciplineArray: any;
    projectId: any;
    projectName: string;
    projectDisciplineArray: any;
    endDate: string;
    startDate: string;
    dataSource: any;
    newFloorList: any[];
    constructor(
        public dialog: MatDialog,
        private _messageNotification: MessageNotifierService,
        private _Activatedroute: ActivatedRoute,
        private _systemService: SystemService,
        private _loaderService: LoaderSpinerService,
        private _snackBar: MatSnackBar
    ) {
        this.projectId = this._Activatedroute.snapshot.paramMap.get("id");
       
    }

    ngOnInit(): void {
        //get deciplineArray list for drop down
        this._systemService.getDeciplineList().subscribe((response: any) => {
            this.deciplineArray = response.disciplines;
        });
        this.getSystemList();
    }
    getSystemList() {
        this._systemService
            .projectWithSystem(this.projectId)
            .subscribe((response: any) => {
                if (response) {
                    const getData = response.project;
                    this.projectName = getData.projectName;
                    this.projectDisciplineArray = getData.projectDisciplines;
                    this.endDate = this.fixDate(getData.endDate);
                    this.startDate = this.fixDate(getData.startDate);
                    this.dataSource = this.projectDisciplineArray;
                }
            });
    }
    filter(filterText: string) {
        if (filterText) {
            let filteredTreeData = [];
            this.newFloorList = [];
            filteredTreeData = this.dataSource;
            filteredTreeData.forEach((element) => {
                if (
                    element.levelName
                        .toLocaleLowerCase()
                        .indexOf(filterText.toLocaleLowerCase()) > -1
                ) {
                    this.newFloorList.push({ ...element });
                }
            });
            this.projectDisciplineArray = this.newFloorList;
        } else {
            this.getSystemList();
        }
    }
    addResource() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = this.projectId;
        dialogConfig.panelClass = "projectassignComponent";

        const dialogRef = this.dialog.open(SystemAddComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            this.getSystemList();
            if (data) {
            }
        });
    }

    downloadFile(systemId, fileName) {
        this._loaderService.show();
        this._systemService.downLoadFile(systemId).subscribe(
            (response: any) => {
                saveAs(response, fileName);
                if (response.errorMessage == null) {
                    this._loaderService.hide();
                    this._messageNotification.successMessage(
                        response.successMessage
                    );
                }
            },
            (error) => {
                this._loaderService.hide();
                this._messageNotification.errorMessage(
                    error.error.errorMessage
                );
            }
        );
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
