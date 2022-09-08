import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { TaskCheckInResponse, TaskCheckOutResponse, TaskListRsponse } from '../models/tasklistResponse';
import { Coordinates, TaskShift, TimeSheetResponse } from '../models/taskShift';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { MessageNotifierService } from 'app/services/message-notifier.service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService implements Resolve<any> {
  baseUrl = environment.apiUrl;

  tasks: Task[];
  filters: any[];
  routeParams: any;

  //task started
  onTaskStatusChanges: BehaviorSubject<TaskShift>;
  coordinates: Coordinates

  onFiltersChanged: BehaviorSubject<any>;
  onTaskChanged: BehaviorSubject<any>;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private _messageNotification:MessageNotifierService,) {
    this.onTaskStatusChanges = new BehaviorSubject(new TaskShift());
    this.coordinates = new Coordinates();
    this.onFiltersChanged = new BehaviorSubject([]);
    this.onTaskChanged = new BehaviorSubject([]);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    this.routeParams = route.params;

    return new Promise<void>((resolve, reject) => {

      Promise.all([
        this.getFilters(),
        //this.loadTasks(0)
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getFilters(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('api/todo-filters')
        .subscribe((response: any) => {
          this.filters = response;

          this.onFiltersChanged.next(this.filters);
          resolve(this.filters);
        }, reject);
    });
  }


  getToken() {
    return localStorage.getItem('token');
  }

  onTaskStarted(taskResourceId, note) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.callTaskStarted(taskResourceId, note, position)
      },error => {
        if (error.code == error.PERMISSION_DENIED) {
            this._messageNotification.warningMessage("Location is not enabled, please enable first to start the task.");
        //   this._snackBar.open("Location is not enabled, please enable first to start the task.", '', { duration: 5000 });
          return;
      }
      if(error.code == error.POSITION_UNAVAILABLE){
        this._messageNotification.warningMessage("Cannot get position");
        //this._snackBar.open("Cannot get position","", {duration:3000});
        return;
      }
      if(error.code == error.TIMEOUT){
        this._messageNotification.warningMessage("Timeout cannot get position");
        // this._snackBar.open("Timeout cannot get position","", {duration:3000});
        return;
      }
      },
      {enableHighAccuracy: true,timeout: 30000,maximumAge: 1});
    }
  }

  callTaskStarted(taskResourceId, note, position){
    const currentTask = new TaskShift();
    currentTask.location = position.coords.latitude + "," + position.coords.longitude;
    currentTask.taskResourceId = taskResourceId
    currentTask.type = 1;
    currentTask.note = note;
    if(position.coords.latitude == undefined){
        this._messageNotification.warningMessage("Location is not enabled, please enable first to start the task.");
     // this._snackBar.open("Location is not enabled, please enable first to start the task.",'', {duration : 5000});
      return;
    }
    this.checkInTask(currentTask).subscribe((response: TaskCheckInResponse) => {
      this.setRunningTask(response.checkIn.id, 1, taskResourceId);
      this.onTaskStatusChanges.next(currentTask);
    },error => {
        this._messageNotification.errorMessage(error.error.errorMessage);
    });
  }

  onTaskStopped(taskResourceId, result, note) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.callTaskStopped(taskResourceId, result, note, position)
      },error => {
        if (error.code == error.PERMISSION_DENIED) {
            this._messageNotification.warningMessage("Location is not enabled, please enable first to start the task.");
          //this._snackBar.open("Location is not enabled, please enable first to start the task.", '', { duration: 5000 });
          return;
      }
      },
      {enableHighAccuracy: true,timeout: 30000,maximumAge: 1});
    }
  }

  async callTaskStopped(taskResourceId, result, note, position){
    const currentRunningTask = await this.getCurrentRunningTaskId(taskResourceId);
    const currentTask = new TaskShift();
    currentTask.location = position.coords.latitude + "," + position.coords.longitude;
    currentTask.id = currentRunningTask.timeSheet.id;
    currentTask.type = 2;
    currentTask.taskResourceId = taskResourceId;
    currentTask.isTaskCompleted = result;
    currentTask.note = note;

    if(position.coords.latitude == undefined){
        this._messageNotification.warningMessage("Location is not enabled, please enable first to start the task.");
    //   this._snackBar.open("Location is not enabled, please enable first to start the task.",'', {duration : 5000});
      return;
    }
    this.checkOutTask(currentTask).subscribe((response: TaskCheckOutResponse) => {
      this.setRunningTask(0, 2, 0);
      this.onTaskStatusChanges.next(currentTask);
    },error => {
        this._messageNotification.errorMessage(error.error.errorMessage);
    //   this._snackBar.open(error.error.errorMessage, "", {
    //     duration : 5000,
    //     horizontalPosition: 'center',
    //     verticalPosition: 'top',
    //   })
    });
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.coordinates.longitude = position.coords.longitude;
        this.coordinates.latitude = position.coords.latitude;
      },this.errorCallback,
      {enableHighAccuracy: true,timeout: 30000,maximumAge: 0});
    }
  }

  errorCallback(error){
    if (error.code == error.PERMISSION_DENIED) {
        this._messageNotification.warningMessage("Location is not enabled, please enable first to start the task.");
    }
  }
 
  getCurrentRunningTask() {
    const items: Task[] = [];
    const currentTask = new TaskShift();
    console.log('resp', currentTask)
    this.loadTasks(0,'')
    .pipe(
      map(arr => arr.tasks.filter(r => r.isInProgress === true))
    )
    .subscribe(resp => {
      if(resp.length > 0){
        currentTask.taskResourceId = resp[0].id;
        currentTask.type = 1;
        this.onTaskStatusChanges.next(currentTask)
      }else{
        currentTask.type = 2;
        this.onTaskStatusChanges.next(currentTask);
      }
    })
  }

  getCurrentRunningTaskId(resourceId){
    return this.getRunningTaskId(resourceId).pipe().toPromise();
  }

  setRunningTask(taskCheckInId: number, type: number, taskResourceId: number) {
    if (type == 1) {
      localStorage.setItem("currentTask", JSON.stringify({ taskCheckInId: taskCheckInId, dateTime: Date.now(), taskResourceId: taskResourceId }))
    }

    if (type == 2) {
      localStorage.removeItem("currentTask");
    }
  }


  loadTasks(filter: number,searchValue:string): Observable<TaskListRsponse> {
    return this.http.post<TaskListRsponse>(this.baseUrl + '/api/TaskResource/GetUserTasks', { filter: filter, searchTerm:searchValue, employeeId: 0 });
  }

  checkInTask(taskShift: TaskShift): Observable<TaskCheckInResponse> {
    return this.http.post<TaskCheckInResponse>(this.baseUrl + '/api/TaskTimeSheet/TaskCheckIn', { checkInLocation: taskShift.location, resourceTaskScheduleId: taskShift.taskResourceId, checkInNotes: taskShift.note });
  }

  checkOutTask(taskShift: TaskShift): Observable<TaskCheckOutResponse> {
    return this.http.post<TaskCheckOutResponse>(this.baseUrl + '/api/TaskTimeSheet/TaskCheckOut', { id: taskShift.id, checkOutLocation: taskShift.location, isCompleted: taskShift.isTaskCompleted, resourceTaskScheduleId: taskShift.taskResourceId, checkOutNotes: taskShift.note });
  }

  getRunningTaskId(id: number): Observable<TimeSheetResponse> {
    let params = new HttpParams().set('resourceTaskScheduleId', id.toString());
    return this.http.get<TimeSheetResponse>(this.baseUrl + '/api/TaskTimeSheet/TaskTimeSheet', { params: params });
  }

}