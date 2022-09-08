import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatAccordion } from "@angular/material/expansion";
import { ActivatedRoute } from "@angular/router";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { flatMap, forEach } from "lodash";
import { LoaderSpinerService } from "../pages/loader-spiner/loader-spiner.service";
import { AddScopeComponent } from "./add-scope/add-scope.component";
import { AddprjectComponent } from "./addprject/addprject.component";
import { CommentModalComponent } from "./comment-modal/comment-modal.component";
import { AwardservicesService } from "./services/awardservices.service";

@Component({
    selector: "app-award-project",
    templateUrl: "./award-project.component.html",
    styleUrls: ["./award-project.component.scss"],
})
export class AwardProjectComponent implements OnInit {
    projectWiseProfitLoss: any = [];
    noRecords = false;
    projectId: any;
    projectScopeArray: any = [];
    @ViewChild("accordion", { static: true }) Accordion: MatAccordion;
    newArrayList: any[];
    dataSource: any[];
    projectName;
    endDate;
    startDate;
    projectCode;
    scopeArray = [];
    checkedList: any = [];
    sendObject: any = {};
    getvalue: string;
    matchvalue: string;
    //checkBoxChecked: boolean = false;
    hideShow: any;
    panelOpenState = false;
    flashcardInputExpanded: boolean = false;
    searchable: boolean = false;
    scopeChanged = false;
    constructor(
        private _Activatedroute: ActivatedRoute,
        private _service: AwardservicesService,
        public dialog: MatDialog,
        private _messageNotification: MessageNotifierService,
        private _loaderService: LoaderSpinerService
    ) {
        this.projectId = this._Activatedroute.snapshot.paramMap.get("id");
    }

    ngOnInit(): void {
        this.getProjectDetails();
    }
    getProjectDetails(){
        this._loaderService.show();
        this._service.getProjectDetails(this.projectId).subscribe((response: any) => {
            console.log("response", response);
            this._loaderService.hide();
            if (response) {
                this.dataSource = response.masterScopes;
                this.projectName = response.project.projectName;
                this.projectCode = response.project.projectCode;
                this.endDate = this.fixDate(response.project.endDate);
                this.startDate = this.fixDate(response.project.startDate);
                this.scopeArray = response.project.scopes;
                this.getProjectScopeList();
            }
        });
    }

    getProjectScopeList() {
        this._service.getMasterProjectScope().subscribe((response) => {
            //  console.log('getAuthorityList',response)
            if (response) {
                this.projectScopeArray = response.masterScopes;
                this.projectScopeArray.forEach((element) => {
                    element.scopes.forEach((scope) => {
                        this.scopeArray.forEach((item) => {
                            if (item.scope.id === scope.id) {
                                scope.checkBoxChecked = true;
                            }
                        });
                    });
                });
                this.dataSource = response.masterScopes;
            }
        });
    }



    addProjectScope(id) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {};
        dialogConfig.data = id;
        //dialogConfig.panelClass = "taskallocation";
        const dialogRef = this.dialog.open(AddScopeComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                    this.getProjectScopeList();
                    this.hideShow = id;
                }
            }
        });
    }

    getSelectedValue(value) {
        this.hideShow = value.id;
        let getSelectvalue = [];
        // this.checkedList=[];
        value.scopes.forEach((element) => {
            if (element.checkBoxChecked) {
                getSelectvalue.push(element);
                this.sendObject = {
                    projectId: this.projectId,
                    masterScope: value.id,
                    scopes: this.checkedList,
                };
            }
        });
        this.checkedList = [...new Set(getSelectvalue)];
    }

    open(masterScopeId){
        this.hideShow = masterScopeId;
    }
    close(masterScopeId){
        this.hideShow = masterScopeId;
        this.scopeChanged = false;
    }
    onChange(event, item, masterId) {
        //this.hideShow = masterId;
        this.scopeChanged = true;
        if (this.searchable) {
            this.getSelectedValue(masterId);
        }
        this.sendObject = {
            projectId: this.projectId,
            masterScope: masterId.id,
            scopes: this.checkedList,
        };
        if (event.checked) {
            this.searchable = false;
            this.checkedList.push(item);
        } else {
            this.searchable = false;
            this.getvalue = item.id;
            for (var i = 0; i < this.checkedList.length; i++) {
                this.matchvalue = this.checkedList[i].id;
                if (this.matchvalue === this.getvalue) {
                    this.checkedList.splice(i, 1);
                }
            }
        }
    }

    searchFilter(filterText: string) {
        if (filterText) {
            let filteredTreeData = [];
            let setNewArrayList = [];
            filteredTreeData = this.dataSource;
            filteredTreeData.forEach((element) => {
                this.newArrayList = [];
                element.scopes.forEach((itemscope) => {
                    if (
                        itemscope.description
                            .toLocaleLowerCase()
                            .indexOf(filterText.toLocaleLowerCase()) > -1 ||
                        element.description
                            .toLocaleLowerCase()
                            .indexOf(filterText.toLocaleLowerCase()) > -1
                    ) {
                        // matExpansionPanel.open();
                        this.flashcardInputExpanded = true;
                        this.newArrayList.push({ ...itemscope });
                    }
                });
                if (this.newArrayList.length > 0) {
                    setNewArrayList.push({
                        ...element,
                        scopes: [...new Set(this.newArrayList)],
                    });
                }
            });
            this.searchable = true;
            this.projectScopeArray = setNewArrayList;
            if (this.projectScopeArray.length == 0) {
                this.noRecords = true;
            } else {
                this.noRecords = false;
            }
        } else {
            this.noRecords = false;
            this.projectScopeArray = this.dataSource;
        }
    }

    fixDate(date) {
        date = new Date(date);
        let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
        let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
        date.setHours(hoursDiff);
        date.setMinutes(minutesDiff);
        return date;
    }

    update(masterId) {
        if (this.checkedList) {
            // let request;
            this._loaderService.show();
            this._service.updateProjectScope(this.sendObject).subscribe(
                (response:any) => {
                    if (response.errorMessage == null) {
                        this.panelOpenState = true;
                        this.hideShow = masterId;
                        this.scopeArray = response.projectScopes;
                        if(this.scopeArray){
                            this.projectScopeArray.forEach((element) => {
                                element.scopes.forEach((scope) => {
                                    this.scopeArray.forEach((item) => {
                                        if (item.scopeId === scope.id) {
                                            scope.checkBoxChecked = true;
                                        }
                                    });
                                });
                            });
                        }
           
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
    }

    addComment(id) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {};
        dialogConfig.data = {
            type: "addComment",
            scopeId: id,
            projectId: this.projectId,
        };
        //dialogConfig.panelClass = "taskallocation";
        const dialogRef = this.dialog.open(CommentModalComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                }
            }
        });
    }
}
