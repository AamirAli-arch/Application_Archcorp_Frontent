import { Component, OnInit, Injectable, AfterViewInit, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, ViewChild, HostListener  } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { ResizeEvent } from 'angular-resizable-element';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);
import 'leader-line';
declare let LeaderLine: any;
import { MatSnackBar } from '@angular/material/snack-bar';

import { Step, User, Link } from './models/step';
import { StepFlatNode } from './models/stepFlatNode';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskAllocationComponent } from '../task-allocation/task-allocation.component';
import { 
  ProjectClient, 
  TaskResourceClient, 
  TaskClient, 
  TaskLinkClient,
  GetSingleProjectResponse, ProjectDto, TaskDto, CreateTaskRequest, UpdateProjectRequest, UpdateTaskRequest, DeleteTaskRequest, DeleteTaskResponse, AddTaskLinkRequest, RemoveTaskLinkRequest, Task } from './services/ApiServices'
import { PlannerService } from './services/planner/planner.service'
import { TaskFlatNode } from './models/taskFlatNode';
import { Project } from './models/project';

import { FuseConfigService } from '@fuse/services/config.service';

import { TaskTimesheetComponent } from '../task-timesheet/task-timesheet.component';
import { MessageNotifierService } from 'app/services/message-notifier.service';
import { DeletePopupComponent } from 'app/main/pages/delete-popup/delete-popup.component';
import { LoaderSpinerService } from 'app/main/pages/loader-spiner/loader-spiner.service';
import { ScrollDispatcher } from '@angular/cdk/scrolling';




@Injectable()
export class ChartDatabase {

  id; // chart id
  moment = moment;
  dataChange = new BehaviorSubject<Step>(null);
  storageKey = 'charts';
  storageLinkKey = 'links';
  project: ProjectDto;
  projects$: Observable<GetSingleProjectResponse>;
  links: Link[] = [];

  get data(): Step { return this.dataChange.value; }

  projectChange = new BehaviorSubject<ProjectDto>(null);
  get projectData() : ProjectDto { return this.projectChange.value; }

  taskChange = new BehaviorSubject<TaskDto>(null);
  get taskData(): TaskDto { return this.taskChange.value; }

  constructor(private route: ActivatedRoute, private _messageNotification:MessageNotifierService,private _loaderService:LoaderSpinerService,
    private dialog: MatDialog,private _snackBar: MatSnackBar, public _taskLinkClient: TaskLinkClient,
    private plannerService: PlannerService, public _projectClient: ProjectClient, 
    public _taskClient : TaskClient, public _taskResourceClient : TaskResourceClient) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.initialize();
    });
    this.dataChange.asObservable().subscribe(val => {
      this.saveStorage(val);
    });
    this.projectChange.asObservable().subscribe(val => {
    });
    this.taskChange.asObservable().subscribe(val => {
      this.saveTask(val);
    });
  }



  updateProject(val){
    if(val != null){
      this._projectClient.update(val).subscribe();
    }
  }

  updateTaskResource(val){
    if(val != null){
      this._taskResourceClient.assignResource(val).subscribe();
    }
  }
 
  updateTask(val){
    if(val != null){
      if(val.id != undefined){
        this._taskClient.update(val).subscribe(res => {
            this._messageNotification.successMessage("Task Updated");
        //   this._snackBar.open("Task Updated", "Done", { 
        //     horizontalPosition: 'center',
        //     verticalPosition: 'top',
        //   })
        },
        error => {
            this._messageNotification.errorMessage(error.errorMessage);
        //   this._snackBar.open(error.errorMessage, "Done", { 
        //     horizontalPosition: 'center',
        //     verticalPosition: 'top',
        //   })
        });
      }
    }
  }

  checkCreatedBy(val) {
    const token = localStorage.getItem("token");
    if (token != null) {
      const parsed = JSON.parse(atob(token.split('.')[1]));
      let empId = parsed.empId;
      if (empId === val.createdBy) {
        return true;
      } else {
        return false;
      }
    }else{
      return false;
    }
    
  }

  saveTask(val){
    if(val != null){
      if(val.id == undefined){
        //this._taskClient.create(val).subscribe();
      }
    }
  }

  updateTaskAllocation(){
    this._projectClient.singleProject(this.id).subscribe((response: GetSingleProjectResponse) => {
      this.initProject(response.project)
    })
  }

  // load local data
  loadStorage() {
    const charts = localStorage.getItem(this.storageKey);
    return JSON.parse(charts);
  }

  loadProject() {
    const projects = this._projectClient.singleProject(this.id).subscribe();
  }

  loadStorageLinks(){
    const links = localStorage.getItem(this.storageLinkKey);
    return JSON.parse(links);
  }

  saveStorageLinks(val){
    if(val != null){
      const links = JSON.parse(localStorage.getItem(this.storageLinkKey)) as Array<Link>;
      links.push(val)
      localStorage.setItem(this.storageLinkKey, JSON.stringify(links));

      const linkRequest = new AddTaskLinkRequest();
      linkRequest.projectId = parseInt(val.project)
      linkRequest.sourceTaskId = val.from;
      linkRequest.targetTaskId = val.to;
    
      //add to api
      this._taskLinkClient.addTaskLink(linkRequest).subscribe(resp => {
        this._messageNotification.successMessage("Task link added.");
        // this._snackBar.open("Task link added.","Done", { 
        //   horizontalPosition: 'center',
        //   verticalPosition: 'top',
        // })
      })
    }
  }

  // save local data
  saveStorage(val) {
    if(val != null){
      const charts = JSON.parse(localStorage.getItem(this.storageKey)) as Array<Step>;
      charts[this.id] = val;
      localStorage.setItem(this.storageKey, JSON.stringify(charts));
    }
  }

  initProject(project: ProjectDto){
    if(project != null){
      const projectTree = this.buildProject(project, 0);
      this.projectChange.next(projectTree);
      this.taskChange.next(projectTree.tasks[0]);
    }
  }

  initialize() {
    const t0 = performance.now();
    this._loaderService.show();
    this._projectClient.singleProject(this.id)
    .subscribe((res : GetSingleProjectResponse) => {
      this._loaderService.hide();
      this.project = res.project;
      this.initProject(this.project);
    });
    const t1 = performance.now();

  }

  addPlannerTask(parentStep: Step){
    this.plannerService.getAllTask().subscribe((response : any) => {
        response.value.forEach(element => {
          const assignedUser : User[] = [];

          for (const [key, value] of Object.entries(element.assignments)) {
            const userID = key;
            const newUser = new User();
            this.plannerService.getUserName(key).subscribe((userResponse : any) => {
              newUser.name = userResponse.displayName;
              newUser.initials = userResponse.displayName.split(" ").map((n,i,a)=> i === 0 || i+1 === a.length ? n[0] : null).join("");
              assignedUser.push(newUser);
            });

          }

          for(var i = 0; i < parentStep.steps.length; i++) {
            if (parentStep.steps[i].name == element.title) {
                return;
            }
          }



        const child = new Step();
        const start = moment(element.startDateTime).format('YYYY-MM-DD');
        const end = moment(element.dueDateTime).format('YYYY-MM-DD');
        child.id = element.id;
        child.name = element.title;
        child.progress = element.percentComplete;
        child.progressDates = [];
        child.dates = {
          start: start,
          end: end
        };
        child.resource = assignedUser;
        child.steps = [];
        parentStep.steps.push(child);
      });
    });
  }

  buildProject(project: ProjectDto, level: number) {
      const newProject = new ProjectDto();
      newProject.id = project.id;
      newProject.projectCode = project.projectCode;
      newProject.projectName = project.projectName;
      newProject.startDate = project.startDate;
      newProject.endDate = project.endDate;
      newProject.createdBy = project.createdBy;
      newProject.expanded = false;
      newProject.days = project.days;
      if (project.tasks.length) {
        newProject.tasks = this.buildTask(project.tasks, level + 1);
      } else {
        newProject.tasks = [];
      }
      return newProject;
  }

  buildTask(tasks: Array<any>, level: number): TaskDto[] {
    return tasks.map((task: TaskDto) => {
      const newTask = new TaskDto();
      newTask.id = task.id;
      newTask.name = task.name;
      newTask.verb = task.verb;
      newTask.progress = task.progress;
      newTask.startDate = task.startDate;
      newTask.endDate = task.endDate;
      newTask.resources = task.resources;
      newTask.duration = task.duration;
      newTask.createdBy = task.createdBy;
      newTask.days = task.days;
      newTask.expanded = false;
      newTask.start = task.start;
      newTask.end = task.end;
      if (task.tasks.length) {
        newTask.tasks = this.buildTask(task.tasks, level + 1);
      } else {
        newTask.tasks = [];
      }
      return newTask;
    });
  }


  // update progress dates
  setProgressDates(step: TaskDto) {
    const start = this.moment(step.startDate);
    const end = this.moment(step.endDate);
    const range = moment.range(start, end);

    const numDays = Math.round(Array.from(range.by('days')).length * step.progress / 100); // estimated completed days
    const totalDays = Array.from(range.by('days')).map(d => d.format('YYYY-MM-DD')); // all days in string array
    return totalDays.splice(0, numDays); // start from 0, get the first len days
  }

  /** step manipulations */
  // update step name
  updateStepName(node: TaskFlatNode, name: string, parentID) {
    const update = Object.assign(new UpdateTaskRequest(), node);
    update.projectId = this.id;
    update.startDate = this.fixDate(this.moment(node.startDate).startOf('day'));
    update.endDate = this.fixDate(this.moment(node.endDate).startOf('day'));
    update.parentTaskId = parentID;
    update.progress = node.progress;
    update.verb = node.verb;
    //node.name = name;
    // do not update tree, otherwise will interupt the typing
    this.updateTask(update);
  }

  updateStepDuration(node: TaskFlatNode, name: number, parentID) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {Type:'update'};
        dialogConfig.panelClass = "delete-modal";
        const dialogRef = this.dialog.open(
            DeletePopupComponent,
            dialogConfig
        );
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                const update = Object.assign(new UpdateTaskRequest(), node);
                update.projectId = this.id;
                update.startDate = this.fixDate(this.moment(node.startDate).startOf('day'));
                update.endDate = this.fixDate(this.moment(node.endDate).startOf('day'));
                update.parentTaskId = parentID;
                update.progress = node.progress;
                update.verb = node.verb;
                update.duration = node.duration;
                //node.name = name;
                // do not update tree, otherwise will interupt the typing
                this.updateTask(update);
            }
        });
  
  }

  updateStepVerb(node: TaskFlatNode, verb: string, parentID) {
    const update = Object.assign(new UpdateTaskRequest(), node);
    update.projectId = this.id;
    update.startDate = this.fixDate(this.moment(node.startDate).startOf('day'));
    update.endDate = this.fixDate(this.moment(node.endDate).startOf('day'));
    update.parentTaskId = parentID;
    update.progress = node.progress;
    update.verb = verb;
    //node.name = name;
    // do not update tree, otherwise will interupt the typing
    this.updateTask(update);
  }

  getLastStepId(parent: Step){
    const lastItem = parent.steps.pop();
    let lastItemId;
    if(lastItem != undefined){
      lastItemId = lastItem.id + 1;
    }
    return lastItem == undefined ? 1 : lastItemId;
  }

  // add child step
  addChildStep(parent: Step) {
    parent.expanded = true; // set parent node expanded to show children
    const child = new Step();
    child.id = Math.floor(Math.random() * 100);
    child.name = '';
    child.progress = 0;
    child.progressDates = [];
    child.dates = {
      start: parent.dates.start,
      end: parent.dates.end
    };
    child.resource = [];
    child.steps = [];
    parent.steps.push(child);
    this.dataChange.next(this.data);
  }

  addChildTask(parent: TaskDto, level : number){
    const child = new CreateTaskRequest();
    child.parentTaskId = level == 0 ? null : parent.id;
    child.name = 'new task';
    child.progress = 0;
    child.projectId = this.id;
    child.startDate = this.fixDate(this.moment(parent.startDate).startOf('day'));
    child.endDate = this.fixDate(this.moment(parent.startDate).startOf('day'));
    this._taskClient.create(child).subscribe(resp => {
      const childTask = new TaskDto();
      child.parentTaskId = resp.task.parentTaskId;
      childTask.id = resp.task.id;
      childTask.name = resp.task.name;
      childTask.progress = resp.task.progress;
      childTask.projectId = resp.task.projectId;
      childTask.startDate = this.fixDate(this.moment(resp.task.startDate).startOf('day'));
      childTask.endDate = this.fixDate(this.moment(resp.task.endDate).startOf('day'));
      childTask.tasks = [];
      childTask.resources = [];
      parent.tasks.push(childTask);
      parent.expanded = true;
      //this.projectChange.next(this.projectData);
      this._projectClient.singleProject(this.id).subscribe((response: GetSingleProjectResponse) => {
        this.projectChange.next(response.project);
      })
    },
    error => {
        this._messageNotification.errorMessage("Error while adding a new task");
    });
  }

  addNewTask() {
    const newTask = new CreateTaskRequest();
    newTask.name = 'edit task';
    newTask.progress = 0;
    newTask.projectId = this.id;
    newTask.startDate = this.projectData.startDate;
    newTask.endDate = this.projectData.endDate;

    this._taskClient.create(newTask).subscribe();
    this.taskChange.next(newTask);
  }

  stepResourceChange(step: TaskDto){
    this.taskChange.next(this.taskData);
  }

  // delete step
  deleteStep(parent: TaskDto, child: TaskDto) {
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
                const childIndex = parent.tasks.indexOf(child);
                parent.tasks.splice(childIndex, 1);
                const deleteTask = new DeleteTaskRequest();
                deleteTask.id = child.id;
                deleteTask.name = child.name;
                deleteTask.projectId = child.projectId;
                deleteTask.progress = child.progress;
                this._taskClient.delete(deleteTask).subscribe(response => {
                  this._projectClient.singleProject(this.id).subscribe((response: GetSingleProjectResponse) => {
                    this.projectChange.next(response.project);
                    this._messageNotification.successMessage("Task Deleted.");
                  })
                },
                error => {
                    this._messageNotification.errorMessage(error.errorMessage);
                });
              }
    });
  }

  // toggle expanded
  toggleExpaned(task: TaskDto) {
    task.expanded = !task.expanded;
  }

  // update progress
  updateProgress(step: TaskDto, progress: number, parentId: number) {
    const update = Object.assign(new UpdateTaskRequest(), step);
    update.projectId = this.id;
    update.startDate = this.fixDate(this.moment(step.startDate).startOf('day'));
    update.endDate = this.fixDate(this.moment(step.endDate).startOf('day'));
    update.parentTaskId = parentId;
    update.progress = progress;
    update.projectId = this.id;
    this.updateTask(update);
    // instead of refreshing whole tree, return progress dates and update the step only
    return step.progress;
  }

  // update date range
  updateDateRange(step: TaskFlatNode, parentId) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {Type:'update'};
      dialogConfig.panelClass = "delete-modal";
      const dialogRef = this.dialog.open(
          DeletePopupComponent,
          dialogConfig
      );
      dialogRef.afterClosed().subscribe((data) => {
          if (data) {
            if(step.level === 0){
                this.projectData.startDate = this.fixDate(this.moment(step.startDate).startOf('day'));
                this.projectData.endDate = this.fixDate(this.moment(step.endDate).startOf('day'));
                const update = Object.assign(new UpdateProjectRequest(), this.projectData);
                this.updateProject(update);
              }else{
                const update = Object.assign(new UpdateTaskRequest(), step);
                update.projectId = this.id;
                update.startDate = this.fixDate(this.moment(step.startDate).startOf('day'));
                update.endDate = this.fixDate(this.moment(step.endDate).startOf('day'));
                update.parentTaskId = parentId;
                this.updateTask(update);
              }
          }
      });

  }

  fixDate(date){
    date = new Date(date);
    let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
    let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
    date.setHours(hoursDiff);
    date.setMinutes(minutesDiff);
    return date;
  }
}


/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [ChartDatabase],
})
export class ChartComponent implements AfterViewInit, OnInit{
  currentProject = new Project();
  moment = moment;
  dates: string[] = []; // all days in chart
  today = moment().format('YYYY-MM-DD');
  taskLinks: any[] = [];
  @ViewChild('widgetsContent') widgetsContent: ElementRef;
  @ViewChild('widgetsContent1') widgetsContent1: ElementRef;
  @HostListener('window:scroll', ['$event'])
  verbList = ["Analyze","Identify","Coordinate","Ensure","Design","Model","Calculate","Strategize","Confirm"];

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap: Map<StepFlatNode, Step> = new Map<StepFlatNode, Step>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap: Map<Step, StepFlatNode> = new Map<Step, StepFlatNode>();



  taskFlatNodeMap: Map<TaskFlatNode, TaskDto> = new Map<TaskFlatNode, TaskDto>();
  taskNestedNodeMap: Map<TaskDto, TaskFlatNode> = new Map<TaskDto, TaskFlatNode>();

  treeControl: FlatTreeControl<StepFlatNode>;
  treeFlattener: MatTreeFlattener<Step, StepFlatNode>;
  dataSource: MatTreeFlatDataSource<Step, StepFlatNode>;


  projectTreeControl: FlatTreeControl<TaskFlatNode>;
  projectTreeFlattner: MatTreeFlattener<TaskDto, TaskFlatNode>;
  projectDataSource: MatTreeFlatDataSource<TaskDto, TaskFlatNode>;

  chartData;


  firstElement;
  secondElement;

  firstElementId;
  secondElementId;

  divHidden = false;
  iconName = "keyboard_arrow_left"

  isSingleClick: Boolean = true;
  
  isStageAllowed: Boolean = false;

  sidebarStyle = {};

  //project
  projectDays: number = 0;




  constructor(private _messageNotification:MessageNotifierService,private _snackBar: MatSnackBar,private _fuseConfigService: FuseConfigService,private database: ChartDatabase, private dialog: MatDialog, private router: Router, private _taskLinkClient: TaskLinkClient) {

    this._fuseConfigService.config = {
      layout: {
        navbar : {
          folded : true
        }
      }
    }
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<StepFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    //project api integration
    this.projectTreeFlattner = new MatTreeFlattener(this.taskTransformer, this._getTaskLevel,
      this._isTaskExpandable, this._getTaskChildren);
    this.projectTreeControl = new FlatTreeControl<TaskFlatNode>(this._getTaskLevel, this._isTaskExpandable);
    this.projectDataSource = new MatTreeFlatDataSource(this.projectTreeControl, this.projectTreeFlattner)

    router.events.subscribe((val) => {
        if(val instanceof NavigationStart){
          const lines = document.getElementsByClassName("leader-line");
          while(lines.length > 0) {
            lines[0].remove();
         }
        }
    });

    database.projectChange.subscribe((project: ProjectDto) => {
      if(project){
        this.chartData = project;
        this.projectDataSource.data = [project]
        this.buildProjectCalendar(project);
        /** expand tree based on status */
        // this.projectTreeControl.dataNodes.forEach(node => {
        //   // if (node.expanded) {
        //   //   this.projectTreeControl.expand(node);
        //   // } else {
        //   //   this.projectTreeControl.collapse(node);
        //   // }
        //   this.projectTreeControl.expand(node);
        // });
        this.projectTreeControl.expandAll();
        //this.projectTreeControl.expand(this.projectTreeControl.dataNodes[0]);
      }
    });

  }

  /** utils of building tree */
  transformer = (node: Step, level: number) => {
    const flatNode = new StepFlatNode(node.id, !!node.steps.length, level, node.name, node.progress, node.progressDates, node.resource, node.dates, node.expanded);
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  taskTransformer = (node: TaskDto, level: number) => {
    const flatNode = new TaskFlatNode(node.id, node.createdBy, node.parentTaskId, !!node.tasks.length, level, node.name, node.progress, node.resources, node.startDate, node.endDate, node.verb, node.duration, node.expanded, node.days, node.start, node.end);
    this.taskFlatNodeMap.set(flatNode, node);
    this.taskNestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  private _getLevel = (node: StepFlatNode) => node.level;

  private _isExpandable = (node: StepFlatNode) => node.expandable;

  private _getChildren = (node: Step): Observable<Step[]> => of(node.steps);


  private _getTaskLevel = (node: TaskFlatNode) => node.level;

  private _isTaskExpandable = (node: TaskFlatNode) => node.expandable;

  private _getTaskChildren = (node: TaskDto): Observable<TaskDto[]> => of(node.tasks);

  hasChild = (_: number, _nodeData: StepFlatNode) => _nodeData.expandable;
  /** end of utils of building tree */

  ngAfterViewInit() {
    setTimeout(() => {
      this.addTaskLinks();
      //this.scrollToToday();
    }, 3000);
  }



//   scrollToToday(){
//     let today = this.moment(Date()).format('YYYY-MM-DD');
//     today = today.slice(5);
//     const todayElement = document.getElementById(today);
//     let offsetTop = todayElement.getBoundingClientRect().top; 
//     console.log(offsetTop) 
//     document.getElementById('chart-container').scrollTo(0, offsetTop)
//   }

  scrollLeft(){
    this.widgetsContent.nativeElement.scrollLeft -= 250;
    this.widgetsContent1.nativeElement.scrollLeft -= 250;
  }

  scrollRight(){
    this.widgetsContent.nativeElement.scrollLeft += 250;
    this.widgetsContent1.nativeElement.scrollLeft += 250;
  }
 
  addTaskLinks() {
    const elmWrapper = document.getElementById('wrapper');
    if(!elmWrapper){
      return;
    }
    elmWrapper.innerHTML = '';
    const links = this.database.loadStorageLinks() as Array<Link>;
  //  const projectLinks = links.filter(e => e.project == this.database.id);
    let wrapperHtml = [];

    this._taskLinkClient.getTaskLinks(this.database.id).subscribe(resp => {
      resp.links.forEach(element => {
        const firstEle = document.getElementById('bar' + element.sourceTaskId.toString());
        const secondEle = document.getElementById('bar' + element.targetTaskId.toString());
        if (firstEle && secondEle) {
          const line = new LeaderLine(firstEle, secondEle, { color: 'black', size: 1 });
          const lineId = element.sourceTaskId.toString() + "_" + element.targetTaskId.toString();
          this.taskLinks.push(line);
          const elmLine1 = document.querySelector('.leader-line:last-of-type:not(#wrapper)');
          elmLine1.id = lineId;
          elmLine1.remove();
          wrapperHtml.push(elmLine1);
        }
      })
      const rectWrapper = elmWrapper.getBoundingClientRect();
      elmWrapper.style.transform = 'translate(-' +
        (rectWrapper.left + pageXOffset) + 'px, -' +
        (rectWrapper.top + pageYOffset) + 'px)';
      wrapperHtml.forEach(ele => {
        elmWrapper.appendChild(ele)
      })
    });
  }

  hideColumns(){
    this.divHidden = !this.divHidden;

    if(this.divHidden){
      this.iconName = "keyboard_arrow_right"
    }else{
      this.iconName = "keyboard_arrow_left"
    }
    this.reDrawLinks();
  }

  reDrawLinks(){
    const elmWrapper = document.getElementById('wrapper');
    elmWrapper.innerHTML = "";
    elmWrapper.removeAttribute("style")
    //this.addTaskLinks();
  }

  checkNode(node){
    if(node.level == 0){
      return true;
    }
  }

  ngOnInit() {
    this.checkIfStageAllowed();
  }

  checkIfStageAllowed(){
    const token = localStorage.getItem("token");
        if(token != null){
            const parsed = JSON.parse(atob(token.split('.')[1]));
            let allowed : string[] = ['1','14','18','20','2','23','31','35','22'];
            let empId = parsed.empId;

            if(!allowed.includes(empId)){
                this.isStageAllowed = false;
            }else{
                this.isStageAllowed = true;
            }
        }
  }

    //Task Allocation dialogue
  openTaskAllocationDialog(node) {

    if(node.duration == 0){
        this._messageNotification.warningMessage("Task Man hours are not set please update the man hours before assigment.");
    //   this._snackBar.open("Task Man hours are not set please update the man hours before assigment.", "Done", { 
    //     horizontalPosition: 'center',
    //     verticalPosition: 'top',
    //   });
      return;
    }

    const dialogConfig = new MatDialogConfig();
    let currentStep = this.taskFlatNodeMap.get(node);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = currentStep;
    dialogConfig.panelClass="taskallocation";
    const dialogRef = this.dialog.open(TaskAllocationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.database.updateTaskAllocation();
        this.taskLinks.forEach(element => {
          element.position();
        })
        //this.addResourceToBar(data);
      }
    );

  }

  addResourceToBar(data){
    data.forEach(element => {
    });
  }

  // getNumberOfColumns(){
  //   if(this.chartData){
  //     const projectStartDate = this.moment(this.chartData.startDate);
  //     const projectEndDate = this.moment(this.chartData.endDate);
  //     const difference = projectEndDate.diff(projectStartDate,'days') + 1;
  //     return {
  //       'grid-template-columns': `50px repeat(${difference}, 50px)`,
  //     };
  //   }
  // }

  // getTaskNumberOfColumns(node: TaskFlatNode){
  //   if(node){
  //     const projectStartDate = this.moment(node.startDate);
  //     const projectEndDate = this.moment(node.endDate);
  //     const difference = projectEndDate.diff(projectStartDate,'days') + 1;
  //     return {
  //       'grid-template-columns': `50px repeat(${difference}, 50px)`,
  //     };
  //   }
  // }

  // getCurrentTaskDays(node: TaskFlatNode){
  //   const stepStartDate = this.moment(node.startDate);
  //   const stepEndDate = this.moment(node.endDate);
  //   const projectStartDate = this.moment(this.chartData.startDate);
  //   const projectEndDate = this.moment(this.chartData.endDate);
  //   let i = 0;
  //   let firstDay = 1;
  //   let lastDay = 1;
  //   for (var m = moment(projectStartDate); m.isSameOrBefore(projectEndDate); m.add(1, 'days')) {
  //     i++;
  //     if(stepStartDate.startOf('day').isSame(m.startOf('day'))){
  //       firstDay = i;
  //     }
  //     if(stepEndDate.startOf('day').isSame(m.startOf('day'))){
  //       lastDay = i + 1;
  //     }
  //   }
  //   return {
  //     'grid-column': `${Math.abs(firstDay)} / ${Math.abs(lastDay)}`,
  //   };

  // }

  // applyProgressClasses(node){
  //   const currentNode = this.taskFlatNodeMap.get(node);
  //   if(currentNode.progress < 100 && new Date(currentNode.endDate).getTime() >= new Date().getTime()){
  //     return "progress ProgressBlue";
  //   }
  //   else if(currentNode.progress === 100 && new Date(currentNode.endDate).getTime() <= new Date().getTime() || currentNode.progress === 100 && new Date(currentNode.endDate).getTime() > new Date().getTime()){
  //     return "progress ProgressGreen";
  //   }else if(currentNode.progress < 100 && new Date(currentNode.endDate).getTime() < new Date().getTime()){
  //     return "progress ProgressRed";
  //   }

  // }

  userInitials(name: string){
    return name.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
  }

  /** tree nodes manipulations */
  updateStepName(node: TaskFlatNode, name: string) {
    const parent = this.getParentStep(node);
    let parentId;
    if(parent.level == 0){
      parentId = null;
    }else{
      parentId = parent.id
    }
    this.database.updateStepName(node, name, parentId);
  }

  updateStepDuration(node: TaskFlatNode, name: number) {
    const parent = this.getParentStep(node);
    let parentId;
    if(parent.level == 0){
      parentId = null;
    }else{
      parentId = parent.id
    }
    this.database.updateStepDuration(node, name, parentId);
  }

  addChildStep(node: StepFlatNode) {
    const nestedNode = this.flatNodeMap.get(node);
    this.database.addChildStep(nestedNode);

  }

  addChildTask(node: TaskFlatNode) {
    const nestedNode = this.taskFlatNodeMap.get(node);
    this.database.addChildTask(nestedNode, node.level);
    setTimeout(this.reDrawLinks,1000)
  }

  addNewTask() {
    this.database.addNewTask();
  }

  deleteStep(node: TaskFlatNode) {
    // if root, ignore
    if (this.projectTreeControl.getLevel(node) < 1) {
      return null;
    }

    const parentFlatNode = this.getParentStep(node);
    const parentNode = this.taskFlatNodeMap.get(parentFlatNode);
    const childNode = this.taskFlatNodeMap.get(node);
    this.database.deleteStep(parentNode, childNode);
  }

  getParentStep(node: TaskFlatNode) {
    const { projectTreeControl } = this;
    const currentLevel = projectTreeControl.getLevel(node);
    // if root, ignore
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = projectTreeControl.dataNodes.indexOf(node) - 1;
    // loop back to find the nearest upper node
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = projectTreeControl.dataNodes[i];
      if (projectTreeControl.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
  }

  checkStepsExist(node: TaskFlatNode){
    const nestedNode = this.taskFlatNodeMap.get(node);
    if(nestedNode.tasks.length > 0 ){
      return true;
    }else{
      return false;
    }
  }

  toggleExpanded(node: TaskFlatNode) {
    const nestedNode = this.taskFlatNodeMap.get(node);
    this.database.toggleExpaned(nestedNode);
    this.addTaskLinks();
  }

  updateProgress(node: TaskFlatNode, progress: number) {
    const nestedNode = this.taskFlatNodeMap.get(node);
    const parent = this.getParentStep(node);
    let parentId;
    if(node.level < 2){
      parentId = null;
    }else{
      parentId = parent.id;
    }
    this.database.updateProgress(nestedNode, progress, parentId)
    // if(parentNode){
    //   const parentPercent = this.calculateTaskProgress(parentNode);
    //   const newParentProgressDates = this.database.updateProgress(parentNode, parentPercent);
    //   parentNode.progressDates = newParentProgressDates;
    // }
  }

  calculateTaskProgress(node: Step){
    const allTaskProgress = node.steps;
    let totalProgress = 0;
    let totalDays = 0;
    allTaskProgress.forEach(function(entry) {
      const endDate = Date.parse(entry.dates.end)
      const startDate = Date.parse(entry.dates.start);
      const difference = endDate - startDate;
      const diffDays = difference / (1000 * 3600 * 24);
      let sumProgress = 0;
      let sumDays = 0;
      sumProgress = sumProgress + ( entry.progress * diffDays);
      sumDays = sumDays + diffDays;

      totalProgress = totalProgress + sumProgress;
      totalDays = totalDays + sumDays;
    });
    let parentPercentage = totalProgress / totalDays;
    return parentPercentage;

  }

  check(node){
  }

  validateName(node: TaskFlatNode){

    if(node.name == ""){
      return true;
    }else{
      return false;
    }

  }

  // removeTaskDependency(event, node: StepFlatNode){
  //   const removeLink = new RemoveTaskLinkRequest();
  //   removeLink.projectId = this.database.id;
  //   removeLink.targetTaskId = 
  //   this.isSingleClick = false;
  //   const nodeId = node.id;
  //   console.log("remove", nodeId)
  //   this._taskLinkClient.removeTaskLink()
  // }

  onSelectedNode(event, node: StepFlatNode) {
    this.isSingleClick = true;
    setTimeout(() => {
      if (this.isSingleClick) {
        this.callSingleClick(event, node);
      }
    }, 250)
  }

  callSingleClick(event,node: StepFlatNode){
    if(node.level === 0){
      return;
    }
    if(this.firstElement == undefined && this.secondElement == undefined){
      this.firstElement = event.target;
      this.firstElement.classList.add('bar-selected')
      this.firstElementId = node.id;
      return;
    }
    if(this.firstElement != undefined && this.secondElement == undefined){
      this.secondElement = event.target;
      this.secondElementId = node.id;
      const line = new LeaderLine(
        this.firstElement,
        this.secondElement,
        {color: 'black', size: 1}
      )
      //update localstorage
      const newlink = new Link();
      newlink.project = this.database.id;
      newlink.to = this.secondElementId;
      newlink.from = this.firstElementId;

      this.database.saveStorageLinks(newlink);

      this.firstElement.classList.remove('bar-selected');
      this.firstElement = undefined;
      this.secondElement = undefined;
    }
  }

  chartScroll(event){
    window.dispatchEvent(new Event('resize'));
  }
 
  updateDateRange(node: TaskFlatNode) {
    const startDate = this.moment(node.startDate).startOf('day');
    const endDate = this.moment(node.endDate).startOf('day');
    const parent = this.getParentStep(node);
    console.log('par date', parent)
    const taskNode = this.taskFlatNodeMap.get(node);

    // if(taskNode.tasks.length > 0){
    //   for(let element of taskNode.tasks){
    //     const childStartDate = this.moment(element.startDate);
    //     if(startDate > childStartDate){
    //       this._snackBar.open("Dependent child is starting before the selected date.","Done",{ 
    //         horizontalPosition: 'center',
    //         verticalPosition: 'top',
    //       });
    //       return;
    //     }
    //   }
    // }

    /** rebuild calendar if the root is updated */
    if (node.level === 0) {
      this.chartData.startDate = startDate;
      this.chartData.endDate = endDate;
      this.buildProjectCalendar(this.chartData);

      //to do update the project dates
    }
    let parentId;
    if(node.level < 2){
      parentId = null;
    }else{
      parentId = parent.id;
    }
    //to do update the task dates
    this.database.updateDateRange(node, parentId);
  }

  updateVerb(event, node, verb){
    if(event.isUserInput){
      const parent = this.getParentStep(node);
      let parentId;
      if(parent.level == 0){
        parentId = null;
      }else{
        parentId = parent.id
      }
      this.database.updateStepVerb(node, verb, parentId);
    }
  }

  /** resize and validate */
  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX = 200;
    if (
      event.rectangle.width &&
      (event.rectangle.width < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: ResizeEvent): void {
    this.sidebarStyle = {
      'width': `${event.rectangle.width}px`
    };
  }


  buildCalendar(step: Step) {
    
    const start = this.moment(step.dates.start);
    const end = this.moment(step.dates.end);
    const range = this.moment.range(start, end);
    
    const days = Array.from(range.by('days'));
    let workArray = [];
    for(let i = 0;i < days.length; i++){
      if(days[i].isoWeekday() != 5 && days[i].isoWeekday() != 6){
        workArray.push(days[i]);
      }
    }
    this.dates = days.map(d => d.format('YYYY-MM-DD'));
    
  }

  buildProjectCalendar(project: ProjectDto) {
    const start = this.moment(project.startDate);
    const end = this.moment(project.endDate);
    const range = this.moment.range(start, end);
    const days = Array.from(range.by('days'));
    this.projectDays = project.days;
    this.dates = days.map(d => d.format('YYYY-MM-DD'));
  }

  checkDate(date){
    const currentDate = this.moment(date);
    if(currentDate.isoWeekday() == 5 || currentDate.isoWeekday() == 6){
      return 'chart-holiday';
    }
  }

  onUserClick(user){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = user;
    dialogConfig.panelClass="taskallocation";

    const dialogRef = this.dialog.open(TaskTimesheetComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(

    );
  }


}