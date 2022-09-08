import { Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TodoService } from 'app/main/apps/todo/todo.service';
import { takeUntil } from 'rxjs/operators';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service'
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);
import { MatSnackBar } from '@angular/material/snack-bar';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MessageNotifierService } from 'app/services/message-notifier.service';

@Component({
    selector: 'todo-list-item',
    templateUrl: './todo-list-item.component.html',
    styleUrls: ['./todo-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TodoListItemComponent implements OnInit, OnDestroy {
    tags: any[];

    
    today = moment().format('YYYY-MM-DD');

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    dialogRef: any;

    @Input() task: Task;
    @Input() runningTask: boolean;
    @Input() currentTaskId: number;

    @HostBinding('class.selected')
    selected: boolean;

    @HostBinding('class.completed')
    completed: boolean;

    @HostBinding('class.move-disabled')
    moveDisabled: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {TodoService} _todoService
     * @param {TaskService} _taskService
     * @param {ActivatedRoute} _activatedRoute
     */
    constructor(
        private _matDialog: MatDialog,private _messageNotification:MessageNotifierService,
        private _todoService: TodoService,
        private _taskService: TaskService,
        private _activatedRoute: ActivatedRoute,
        private _snackBar: MatSnackBar
    ) {
        // Disable move if path is not /all
        if (_activatedRoute.snapshot.url[0].path !== 'all') {
            this.moveDisabled = true;
        }
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Set the initial values
        //this.task = new Task();
        // this.completed = this.todo.completed;
        //this._taskService.getCurrentRunningTask();

        // Subscribe to update on selected todo change
        this._todoService.onSelectedTodosChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedTodos => {
                this.selected = false;

                if (selectedTodos.length > 0) {
                    for (const todo of selectedTodos) {
                        if (todo.id === this.task.id) {
                            this.selected = true;
                            break;
                        }
                    }
                }
            });

        // Subscribe to update on tag change
        this._todoService.onTagsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(tags => {
                this.tags = tags;
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
     * On selected change
     */
    onSelectedChange(): void {
        this._todoService.toggleSelectedTodo(this.task.id);
    }

    /**
     * Toggle star
     */
    toggleStar(event): void {
        // event.stopPropagation();

        // this.todo.toggleStar();
        // this._todoService.updateTodo(this.todo);
    }

    /**
     * Toggle Important
     */
    toggleImportant(event): void {
        // event.stopPropagation();

        // this.todo.toggleImportant();
        // this._todoService.updateTodo(this.todo);
    }

    /**
     * Toggle Completed
     */
    toggleCompleted(event): void {
        // event.stopPropagation();

        // this.todo.toggleCompleted();
        // this._todoService.updateTodo(this.todo);
    }


    taskStart(event, taskResourceId: number): void {
        event.stopPropagation();
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.startTask(taskResourceId)
            }, error => {
                if (error.code == error.PERMISSION_DENIED) {
                    this._messageNotification.warningMessage("Location is not enabled, please enable first to start the task.");
                    //this._snackBar.open("Location is not enabled, please enable first to start the task.", '', { duration: 5000 });
                    return;
                }
                this._messageNotification.warningMessage(error.code.toString());
                //this._snackBar.open(error.code.toString(), "", {duration: 3000})
            });
        }
    }

    startTask(taskResourceId: number){
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false,

        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Do you want to start the task ?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if(result.isComplete){
                this._taskService.onTaskStarted(taskResourceId, result.note);
            }
            this.confirmDialogRef = null;
        });
    }

    taskStop(event, taskResourceId: number): void {
        event.stopPropagation();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.endTask(taskResourceId)
            }, error => {
                if (error.code == error.PERMISSION_DENIED) {
                    this._messageNotification.warningMessage("Location is not enabled, please enable first to start the task.");
                    // this._snackBar.open("Location is not enabled, please enable first to start the task.", '', { duration: 5000 });
                    return;
                }
            });
        }
    }

    endTask(taskResourceId:number){
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false,

        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Is this task completed ?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            this._taskService.onTaskStopped(taskResourceId, result.isComplete, result.note);
            this.confirmDialogRef = null;
        });
    }
}
