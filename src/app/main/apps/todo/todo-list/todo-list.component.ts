import { Component, OnDestroy, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { Todo } from 'app/main/apps/todo/todo.model';
import { TodoService } from 'app/main/apps/todo/todo.service';
import { takeUntil } from 'rxjs/operators';
import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { TaskListRsponse } from '../models/tasklistResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConditionalExpr } from '@angular/compiler';
import { MessageNotifierService } from 'app/services/message-notifier.service';

@Component({
    selector: 'todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit, OnDestroy, OnChanges {
    todos: Todo[];
    tasks: Task[] = [];
    currentTodo: Todo;

    currentTaskId: number;
    runningTask: boolean = false;
    isLoading:boolean = true;
    search_text:string="";
    project_text:string="";
    filterId=2;
    @Input() filter: number;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     * @param {TodoService} _todoService
     * @param {Location} _location
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _todoService: TodoService,
        private _location: Location,
        private taskService: TaskService,
        private _snackBar: MatSnackBar,
        private _changeDetectRef: ChangeDetectorRef,private _messageNotification:MessageNotifierService,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.taskService.getCurrentRunningTask();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------



    ngOnChanges(changes: SimpleChanges) {
        if (changes.filter.currentValue != undefined) {
            this.filterId=changes.filter.currentValue;
            this.LoadTasks(changes.filter.currentValue);
        }
    }

    LoadTasks(filter) {
        this.taskService.loadTasks(filter,this.search_text).subscribe(
            (resp: TaskListRsponse) => {
                this.tasks = resp.tasks;
                this.isLoading = false;
                this._changeDetectRef.detectChanges();
            },
            (error: any) => {
                this._messageNotification.errorMessage('Error while loading task. ' + error);
               //this._snackBar.open('Error while loading task. ' + error, '', { duration : 3000 })
            }
        )
    }

    /**
     * On init
     */
    ngOnInit(): void {
        //this.LoadTasks(2);
        // this.taskService.onTaskStatusChanges
        // .pipe(takeUntil(this._unsubscribeAll))
        // .subscribe(val => {
        //    this.tasks =  this.tasks.map(x => (x.id === val.taskResourceId ? { ...x, isCompleted: val.isTaskCompleted } : x));
        // })
        // Subscribe to update todos on changes
        this._todoService.onSearchTextChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(response => {
            if(response){
                this.search_text=response;
                this.LoadTasks(this.filterId)
            } else{
                this.search_text="";
                this.LoadTasks(this.filterId)
            }
        });

        this._todoService.onProjectTextChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(response => {
            if(response){
                this.tasks = this.tasks.filter(function(e){
                    return e.projectName.toLowerCase().includes(response.toLowerCase())
                })
                if(this.tasks.length == 0 || response == ""){
                    this.LoadTasks(this.filterId);
                }
            }
            
            this._changeDetectRef.detectChanges();
        });

        this._todoService.onTodosChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(todos => {
                this.todos = todos;
            });

        this.taskService.onTaskStatusChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(current => {
                if (current.type == 2) {
                    this.tasks =  this.tasks.map(x => (x.id === current.taskResourceId ? { ...x, isCompleted: current.isTaskCompleted } : x));
                    this.runningTask = false;
                }
                else {
                    this.runningTask = true;
                    this.currentTaskId = current.taskResourceId;
                }
                this._changeDetectRef.detectChanges();
            });

        // Subscribe to update current todo on changes
        this._todoService.onCurrentTodoChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentTodo => {
                if (!currentTodo) {
                    // Set the current todo id to null to deselect the current todo
                    this.currentTodo = null;

                    // Handle the location changes
                    const tagHandle = this._activatedRoute.snapshot.params.tagHandle,
                        filterHandle = this._activatedRoute.snapshot.params.filterHandle;

                    if (tagHandle) {
                        this._location.go('apps/todo/tag/' + tagHandle);
                    }
                    else if (filterHandle) {
                        this._location.go('apps/todo/filter/' + filterHandle);
                    }
                    else {
                        this._location.go('apps/todo/all');
                    }
                }
                else {
                    this.currentTodo = currentTodo;
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Read todo
     *
     * @param todoId
     */
    readTodo(todoId): void {
        // Set current todo
        this._todoService.setCurrentTodo(todoId);
    }

    /**
     * On drop
     *
     * @param ev
     */
    onDrop(ev): void {

    }
}
