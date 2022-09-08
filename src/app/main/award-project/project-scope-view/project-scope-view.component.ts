import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { LoaderSpinerService } from "app/main/pages/loader-spiner/loader-spiner.service";
import { CommentModalComponent } from "../comment-modal/comment-modal.component";

import { AwardservicesService } from "../services/awardservices.service";

@Component({
    selector: "app-project-scope-view",
    templateUrl: "./project-scope-view.component.html",
    styleUrls: ["./project-scope-view.component.scss"],
})
export class ProjectScopeViewComponent implements OnInit {
    projectId:any;
    startDate: string;
    endDate: string;
    projectName: string;
    noRecords = false;
    dataSource: any;
    newArrayList: any = [];
    projectScopeArray: any;
    projectCode: any;
    scopeArray: any;
    constructor(
        private _service: AwardservicesService, private _loaderService: LoaderSpinerService,
        public dialog: MatDialog,  private _Activatedroute: ActivatedRoute,
    ) {
        this.projectId = this._Activatedroute.snapshot.paramMap.get("id");
    }

    ngOnInit() {
        this.getProjectDetails();
  
    }

    getProjectDetails(){
        this._loaderService.show();
        this._service.getProjectDetails(this.projectId).subscribe((response: any) => {
            this._loaderService.hide();
            if (response) {
                this.projectScopeArray = response.masterScopes;
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
              console.log('getAuthorityList',response)
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

    viewComment(id) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {};
        dialogConfig.data = {
            type: "viewComment",
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

