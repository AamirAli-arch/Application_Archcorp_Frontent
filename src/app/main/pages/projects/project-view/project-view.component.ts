import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTree, MatTreeNestedDataSource } from "@angular/material/tree";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TaskAllocationComponent } from "app/main/charts/task-allocation/task-allocation.component";
import { TaskFlatNode } from "app/main/charts/chart/models/taskFlatNode";
import { TaskDto } from "app/main/charts/chart/services/ApiServices";
import { ProjectassignComponent } from "../projectassign/projectassign.component";
import { ProjectService } from "../services/project.services";
import { ActivatedRoute } from "@angular/router";
import { ProjectView, Task, TaskRequestDelete } from "../models/projectrequest";

import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { MessageNotifierService } from "app/services/message-notifier.service";
import { TaskTimesheetComponent } from "app/main/charts/task-timesheet/task-timesheet.component";
import { ResourceModalpopupComponent } from "../resource-modalpopup/resource-modalpopup.component";
import { DeletePopupComponent } from "../../delete-popup/delete-popup.component";

@Component({
    selector: "app-project-view",
    templateUrl: "./project-view.component.html",
    styleUrls: ["./project-view.component.scss"],
})
export class ProjectViewComponent implements OnInit {
    recursive: boolean = false;
    levels = new Map<Task, number>();
    treeControl = new NestedTreeControl<Task>((node) => node.tasks);
    dataSource = new MatTreeNestedDataSource<Task>();

    getProjectId: number;
    expand: any;
    startDate: string;
    endDate: string;
    treeData: Task[];
    selectionState;
    expandedNodes;
    searchProjectName = "";
    projectName: string;
    hideShow;
    deleteNodeId:any;
    @ViewChild("tree") tree: MatTree<any>;

    constructor(
        private _activatedRoute: ActivatedRoute,private _loaderService:LoaderSpinerService,
        private dialog: MatDialog,private _messageNotification:MessageNotifierService,
        private _snackBar: MatSnackBar,
        private _projectService: ProjectService,
        private cd: ChangeDetectorRef
    ) {
        this.treeControl = new NestedTreeControl<Task>(this.getChildren);
        this.dataSource = new MatTreeNestedDataSource();
        this.getProjectId = this._activatedRoute.snapshot.params["id"];
    }

    getChildren = (node: Task) => {
        //console.log('top + 1', node.tasks.length, node.tasks)
        return node.tasks;
    };

    hasChildren = (index: number, node: Task) => {
        //console.log('top', node.tasks.length, node.tasks)
        return node.tasks.length > 0;
    };

    hasChild = (_: number, node: Task) => !!node.tasks && node.tasks.length > 0;

    ngOnInit() {

        //Call the method first time load
        this.singleProjectList();
    }

    //first time node load
    singleProjectList() {
        const request = new ProjectView();
        request.id = this.getProjectId;
        this._loaderService.show();
        this._projectService
            .getSingleProjectResponse(request)
            .subscribe((response: any) => {
                this._loaderService.hide();
                this.treeData = response.project.tasks;
                this.projectName = response.project.projectName;
                this.dataSource.data = this.treeData;
                this.treeControl.dataNodes = this.treeData;
               // console.log('this.treeControl.dataNodes', this.treeControl.dataNodes[0].id)
            });
           
           // this.treeControl.expand(this.treeControl.dataNodes[5]);
            //this.treeControl.expand(this.treeControl.dataNodes[this.treeControl.dataNodes[0].id])
    }
    expandNodes(nodes) {
        nodes.forEach((element) => {
            const nodeIndex = this.findWithAttr(
                this.treeData,
                "id",
                element.id
            );
            if (nodeIndex > -1) {
                this.treeControl.expand(this.treeControl.dataNodes[nodeIndex]);
                nodes.splice(element, 1);
                this.expandNodes(nodes);
            }
        });
    }
    //Task Allocation dialogue
    openTaskAllocationDialog(node) {
        if (node.duration == 0) {
            this._messageNotification.warningMessage("Task Man hours are not set please update the man hours before assigment.");
            // this._snackBar.open(
            //     "Task Man hours are not set please update the man hours before assigment.",
            //     "",
            //     {
            //         duration: 5000,
            //         horizontalPosition: "center",
            //         verticalPosition: "top",
            //     }
            // );
            return;
        }

        const dialogConfig = new MatDialogConfig();
        //let currentStep = this.taskFlatNodeMap.get(node);
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = node;
        dialogConfig.panelClass="taskallocation"
        const dialogRef = this.dialog.open(
            TaskAllocationComponent,
            dialogConfig
        );
        this.singleProjectList();
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                    this.singleProjectList();

                    // this.treeControl.expand(node);
                } else {
                    this.singleProjectList();
                }
            }
        });
    }
    openTaskDialog(node, name) {
        let nodeId=node.id;
     
        this.deleteNodeId=node.id;
        this.expandedNodes = this.treeControl.expansionModel.selected;
      
        const ancestors = this.getAncestors(this.dataSource.data, node.id);
        const directParent = ancestors[ancestors.length - 2];

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            node,
            name,
            stardate: node.startDate,
            enddate: node.endDate,
            parentStartDate: directParent?.startDate,
            parentEndDate: directParent?.endDate,
        };
        dialogConfig.panelClass="taskAssign"
        const dialogRef = this.dialog.open(
            ProjectassignComponent,
            dialogConfig
        );

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                if (data.errorMessage == null) {
                    if (name == "add") {

                        const request = new ProjectView();
                        request.id = this.getProjectId;
                        this._projectService
                            .getSingleProjectResponse(request)
                            .subscribe((response: any) => {
                                if (response) {
                                    this.treeData = response.project.tasks;
                                    this.treeData = response.project.tasks;
                                    this.dataSource.data = this.treeData;
                                    this.treeControl.dataNodes = this.treeData;
                                    this.expandedNodes.forEach((node, i) => {
                                            if(node.id===node.id){
                                            this.treeControl.expand(this.treeControl.dataNodes.find(n => n.id === node.id));
                                            //this.treeControl.expand(this.treeControl.dataNodes.find(n => n.parentTaskId === node.parentTaskId));
                                            } else{
                                                //this.treeControl.expand(this.treeControl.dataNodes.find(n => n.parentTaskId === node.parentTaskId));
                                            }
                                        });

                                }
                            });

                    } else {
                        const request = new ProjectView();
                        request.id = this.getProjectId;
             
                    }
                } else {
                   // this.singleProjectList();
                }
            }
        });
    }

    getAncestors(array, name) {
        if (typeof array !== "undefined") {
            for (let i = 0; i < array.length; i++) {
                if (array[i].id === name) {
                    return [array[i]];
                }
                const a = this.getAncestors(array[i].tasks, name);
                if (a !== null) {
                    a.unshift(array[i]);
                    return a;
                }
            }
        }
        return null;
    }

    newExpand(nodeData) {
        nodeData.forEach((node) => {
            //this.treeControl.expand(node);
            this.treeControl.expand(node.id);
            if (this.treeControl.getChildren(node)) {
           // this.newExpand(this.treeControl.getChildren(node));
            }
        });
    }

    unique(array, propertyName) {
        return array.filter(
            (e, i) =>
                array.findIndex((a) => a[propertyName] === e[propertyName]) ===
                i
        );
    }

    expandnew(data: Task[], uniqueId: number): any {
        data.forEach((node) => {
            if (node.tasks && node.tasks.find((c) => c.id === uniqueId)) {

                this.treeControl.expand(node);
                this.expandnew(this.dataSource.data, node.id);
            } else if (node.tasks && node.tasks.find((c) => c.tasks)) {
                this.expandnew(node.tasks, uniqueId);
            }
        });
    }

    // exp(data: ProjectView[], name: number): any {
    //   data.forEach(node => {
    //     if (node.tasks && node.tasks.find(c => c.id === name)) {
    //       const nodeIndex = this.findWithAttr(node.tasks, 'id', node.id)
    //       this.treeControl.expand(this.treeControl.dataNodes[nodeIndex]);
    //       this.exp(this.dataSource.data, node.id);
    //     }
    //     else if (node.tasks && node.tasks.find(c => c.tasks)) {
    //       this.exp(node.tasks, name);
    //     }
    //   });
    // }

    findWithAttr(array, attr, value) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }
    nodeId(Id){
        console.log('id', Id)
        this.deleteNodeId=Id;
    }
    deleteTask(node) {
        this.expandedNodes = this.treeControl.expansionModel.selected;
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
                const request = new TaskRequestDelete();
                request.startDate = this.fixDate(node.startDate);
                request.endDate = this.fixDate(node.endDate);
                request.name = node.name;
                request.duration = node.duration;
                request.verb = node.verb;
                request.parentTaskId = node.parentTaskId;
                request.id = node.id;
                request.projectId = node.projectId;
                this._projectService.deleteProjectTask(request).subscribe(
                    (respose: any) => {
                        const request = new ProjectView();
                        request.id = this.getProjectId;
                        this._projectService
                        .getSingleProjectResponse(request)
                        .subscribe((response: any) => {
                            if (response) {
                                this.treeData = response.project.tasks;
                                this.treeData = response.project.tasks;
                                this.dataSource.data = this.treeData;
                                this.treeControl.dataNodes = this.treeData;
                                this.expandedNodes.forEach(node => {
                                    if(node.id===node.id){
                                        this.treeControl.expand(this.treeControl.dataNodes.find(n => n.id === node.id));
                                    } else{
                                      // this.treeControl.expand(this.treeControl.dataNodes.find(n => n.parentTaskId === node.parentTaskId));
                                     }
                                });

                            }
                        });
                        if (respose.errorMessage == null) {
                            this._messageNotification.successMessage(respose.successMessage);
                        }
                    },
                    (error) => {
                        this._messageNotification.errorMessage(error.error.errorMessage);
                    }
                );
            }
        });

    }
    fixDate(date) {
        date = new Date(date);
        let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
        let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
        date.setHours(hoursDiff);
        date.setMinutes(minutesDiff);
        return date;
    }

    restoreExpandedNodes(nodeId) {
        this.expandedNodes.forEach((node) => {
            this.treeControl.expand(
                this.treeControl.dataNodes.find((n) => n.id === nodeId)
            );
        });
    }
    applyFilter(filterText: string) {
        const filterData = this.filter(this.treeData, filterText);
        this.dataSource = filterData;
        this.dataSource.data = filterData;
        this.treeControl.dataNodes = filterData;
        this.treeControl.dataNodes.forEach((node) => {
            this.treeControl.expand(node);
        });
    }

    deletefilter(array, text){
        const getNodes = (result, object) => {
            if (this.checkName(object.taskType, text)) {
                result.push(object);
                return result;
            }
            if (Array.isArray(object.taskType)) {
                const tasks = object.taskType.reduce(getNodes, []);
                if (tasks.length) result.push({ ...object, tasks });
            }
            return result;
        };

        return array.reduce(getNodes, []);
    }
    
    filter(array, text) {
        const getNodes = (result, object) => {
            if (this.checkName(object.name, text)) {
                result.push(object);
                return result;
            }
            if (Array.isArray(object.tasks)) {
                const tasks = object.tasks.reduce(getNodes, []);
                if (tasks.length) result.push({ ...object, tasks });
            }
            return result;
        };

        return array.reduce(getNodes, []);
    }

    checkName(text, search) {
        text = text.toLocaleLowerCase();
        search = search.toLocaleLowerCase();
        if (text.indexOf(search) > -1) {
            return true;
        } else {
            return false;
        }
    }
    resurcehideShow(user){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = user;
        dialogConfig.panelClass="resourceallocation";
        const dialogRef = this.dialog.open(ResourceModalpopupComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(

        );
    }
    userInitials(name: string){
        return name.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
    }
}

