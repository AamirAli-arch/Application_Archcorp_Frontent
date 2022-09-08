import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../chart/models/step';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { 
  GetDepartmentsResponse, 
  DepartmentClient, DepartmentDto, 
  DesignationDto, DesignationsWithEmployeesResponse, 
  EmployeeForDesignationDto, TaskResourceClient, TaskResourceDto, AddTaskResourceRequest, DeleteTaskRsourceRequest } from '../chart/services/ApiServices';
import { AssignResourceRequest } from './model/assingResource';
const moment = extendMoment(Moment);
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageNotifierService } from 'app/services/message-notifier.service';

@Component({
  selector: 'app-task-allocation',
  templateUrl: './task-allocation.component.html',
  styleUrls: ['./task-allocation.component.scss']
})
export class TaskAllocationComponent implements OnInit {
  moment = moment;
  form: FormGroup;
  allocationForm: FormGroup;
  selectedResources: EmployeeForDesignationDto[];
  filteredResources: User[];
  title: string;
  taskId: number;
  showTimeAllocationField: boolean = false;
  resourceControl = new FormControl();
  disciplineControl = new FormControl();
  selectedResource = new TaskResourceDto();
  days: any;
  hours: any;

  hoursSelectedResource: any;

  showTimeAllocation: boolean = false;
  
  deptartments: DepartmentDto[];
  designations: DesignationDto[];
  employees: EmployeeForDesignationDto[];
  currentlySelectedDepartment = new DepartmentDto();
  tempResources: Array<EmployeeForDesignationDto> = new Array();

  selectedEmployees: EmployeeForDesignationDto[] = [];
  closedhide=false;
  constructor(
      private fb: FormBuilder,private _messageNotification:MessageNotifierService,
      public _departmentClient : DepartmentClient,
      public _taskResourceClient : TaskResourceClient,
      private dialogRef: MatDialogRef<TaskAllocationComponent>,
      public _snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data : any) {
        this.title = data.name;
        this.taskId = data.id;
        this.hours = data.duration;
        this.selectedResources = this.data.resources as TaskResourceDto[];
        this.filteredResources = this.data.resource as User[];
        this.employees = this.data.resources as EmployeeForDesignationDto[];
        this.tempResources = this.data.resources as EmployeeForDesignationDto[];
  }

  getNumberOfDays(){
    const startDate = moment(this.data.startDate);
    const endDate = moment(this.data.endDate);
    
    const difference = endDate.diff(startDate, 'days');
    return difference + 1;
  }

  ngOnInit() {
      this.getDepartments();
      this.form = this.fb.group({
        // discipline: ['', Validators.required],
        resource: [this.selectedResource, Validators.required],
        
      });
      this.allocationForm = this.fb.group({
        type: new FormControl(''),
        hours: new FormControl(''),
        startDate: new FormControl(''),
        endDate: new FormControl(''),
        reday: new FormControl(''),
        recurringType: new FormControl('')
      })
      this.resourceControl.setValue(this.selectedResources);
      this.tempResources = this.employees;
      this.days = this.getNumberOfDays();
      this.getAllocatedHours();
      
  }

  getDepartments(){
    this._departmentClient.departments().subscribe((response : GetDepartmentsResponse) => {
      this.deptartments = response.departments;
    });
  }

  compareFn(user1: EmployeeForDesignationDto, user2: TaskResourceDto) {
    return user1 && user2 ? user1.id === user2.employeeId : user1 === user2;
  }

  AllocateTime(user: EmployeeForDesignationDto){
    this.showTimeAllocationField = true;
    this.hoursSelectedResource = user;
    this.showTimeAllocation = false;
    this.closedhide=true;

  }

  allocateHoursToRsource(event){
    this.showTimeAllocationField = false;
    //this.selectedResource.allocatedHours = event.target.value;
    const newAssignement = new AssignResourceRequest();
    this._taskResourceClient.assignResource(this.selectedResource).subscribe(resp => {
    });
  }

  resourceChanged(event: any, resource: any){
    if(event.isUserInput && event.source._selected){
      this.tempResources.push(resource)
   
    }else if(event.isUserInput && !event.source._selected){
      this.tempResources.splice(this.tempResources.findIndex(function(i){
        return i.name === resource.name;
      }), 1);

      const assignment = new DeleteTaskRsourceRequest();
      assignment.employeeId = resource.id;
      assignment.taskId = this.taskId;
      assignment.allocatedHours = 1;
      this._taskResourceClient.removeResource(assignment).subscribe(resp => {},
        error => {
            this._messageNotification.errorMessage("Error while removing assignment. " + error.errorMessage);
        //this._snackBar.open("Error while removing assignment. " + error.errorMessage, '' , { 
        //   duration : 5000,
        //   horizontalPosition: 'center',
        //   verticalPosition: 'top',
        // })
    });
    }
  }

  onDepartmentChange(department: DepartmentDto ,event: any){
    if(event.isUserInput){
      this._departmentClient.designationsWithEmployees(department.id).subscribe((response:DesignationsWithEmployeesResponse) => {
        this.designations = response.designations;
      })
    }
  }

  update(){
      if(this.allocationForm.controls['hours'].value <= 9){
    // this.showTimeAllocationField = false;
    // this.selectedResource.allocatedHours = this.allocationForm.controls['hours'].value;
    const newAssignement = new AddTaskResourceRequest();

    //getting task id from data
    newAssignement.taskId = this.data.id;

    //get employee id from hours selected resource
    newAssignement.employeeId = this.hoursSelectedResource.id != undefined ? this.hoursSelectedResource.id :  this.hoursSelectedResource.employeeId;
    
    newAssignement.allocatedHours = this.allocationForm.value.hours;
    switch(this.allocationForm.value.type){
      case "1":
        newAssignement.isDefault = true;
        newAssignement.isSingle = false;
        newAssignement.isMultiple = false;
        newAssignement.isRecurring = false;
        break;
      case "2":
        newAssignement.isDefault = false;
        newAssignement.isSingle = true;
        newAssignement.isMultiple = false;
        newAssignement.isRecurring = false;
        newAssignement.startDate = this.fixDate(this.moment(this.allocationForm.value.startDate).startOf('day'));
        break;
      case "3":
        newAssignement.isDefault = false;
        newAssignement.isSingle = false;
        newAssignement.isMultiple = true;
        newAssignement.isRecurring = false;
        newAssignement.startDate = this.fixDate(this.moment(this.allocationForm.value.startDate).startOf('day'));
        newAssignement.endDate = this.fixDate(this.moment(this.allocationForm.value.endDate).startOf('day'));
        break;
      case "4":
        newAssignement.isDefault = false;
        newAssignement.isSingle = false;
        newAssignement.isMultiple = false;
        newAssignement.isRecurring = true;
        newAssignement.recurringDays = this.allocationForm.value.reday;
        newAssignement.recurringAssignmentType=this.allocationForm.value.recurringType;
      default:
        break; 
    }
    
    this._taskResourceClient.assignResource(newAssignement).subscribe(resp => {
        this._messageNotification.successMessage("Task assignment updated.");
      this.allocationForm.reset();
      this.showTimeAllocationField = false;
      this.closedhide=true;
      this.dialogRef.close(this.designations);
    },
    error => {
        this._messageNotification.errorMessage("Error while updating task assignment. " + error.errorMessage);

    });
} else{
    this._messageNotification.warningMessage("Can not assign more than 9 hours for single day");
}
  }

  setDefaultAllocation(){
    const days = this.days;
    const hours = this.hours;

    const divide = hours/days;
    this.allocationForm.controls['hours'].setValue(divide);
  }

  getAllocatedHours(){
  
  }

  // change(event)
  // {
  //   if(event.isUserInput) {
  //     let currentId = event.source.value.id;
  //     if(this.userExists(currentId)){
  //       const leaveStartDate = this.moment(this.userLeaves.find(x => x.id === currentId).leaveStartDate);
  //       const leaveEndDate = this.moment(this.userLeaves.find(x => x.id === currentId).leaveEndDate);

  //       const stepStartDate = this.moment(this.data.dates.start);
  //       const stepEndDate = this.moment(this.data.dates.end);

  //       if((leaveStartDate > stepStartDate && leaveStartDate < stepEndDate) || (leaveEndDate > stepStartDate && leaveEndDate < stepEndDate))
  //       {
          
  //         alert("Selected Resource will be on leaves : Starts from " + leaveStartDate.format("DD MMMM YYYY") + " Ends at: " + leaveEndDate.format("DD MMMM YYYY"))
  //       }
        
  //     }
  //   }
  // }

  // userExists(id) {
  //   return this.userLeaves.some(function(el) {
  //     return el.id === id;
  //   }); 
  // }

  save() {
      this.dialogRef.close(this.designations);
  }

  close() {
      this.dialogRef.close(this.designations);
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
