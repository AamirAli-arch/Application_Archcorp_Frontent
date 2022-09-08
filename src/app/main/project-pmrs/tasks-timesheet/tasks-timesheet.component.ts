import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSelfAllocatedTaskComponent } from './add-self-allocated-task/add-self-allocated-task.component';
@Component({
  selector: 'app-tasks-timesheet',
  templateUrl: './tasks-timesheet.component.html',
  styleUrls: ['./tasks-timesheet.component.scss']
})
export class TasksTimesheetComponent implements OnInit {

  // tasksTimesheetForm: FormGroup;

  // projectSelected : string;
  // taskTypeSelected : string;


  constructor(private fb: FormBuilder,public dialog: MatDialog,) { }

  // taskTypes =[
  //   {id:'1',name:'Project Planned Tasks'},
  //   {id:'2',name:'Self Allocated Tasks'},
  //   {id:'3',name:'Self Planned Tasks'},
  //   {id:'4',name:'Project Non Planned Tasks'},    
  // ]  

  // projects =[
  //   {id:'1',name:'Sharjah Coop'},
  //   {id:'2',name:'Kurdistan Gas Pipeline Network Development'},
  //   {id:'3',name:'HE ASAD Modification 318, E25 Al Nahyan, Abu Dhabi'},
  //   {id:'4',name:'G+8 Residential Building at DSO '},
  //   {id:'5',name:'Al Maimoon Majlis Al Dhaid'},    
  //   {id:'6',name:'AGMC BMW Showroom Nad Al Hamar'},    
  //   {id:'7',name:'Village Villa'},    
  //   {id:'8',name:'Abu Dhabi Existing Villa'},  
  //   {id:'9',name:'Al Dhaid Mosque - Sharjah'},  
  //   {id:'10', name:'AGMC BMW Showroom Sharjah'}
  // ]  


  ngOnInit(): void {

  //   this.tasksTimesheetForm = this.fb.group({
  //     projectName: new FormControl(""),
  //   taskType: new FormControl(""),
      
  // });
  }



  selfAllocatedTask() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = null;
    dialogConfig.panelClass = "projectassignComponent";

    const dialogRef = this.dialog.open(AddSelfAllocatedTaskComponent,dialogConfig );
    //this.edtidelte = -1;
    dialogRef.afterClosed().subscribe((data) => {
        if (data) {
            if (data.errorMessage == null) {
                console.log('Welcome Message','Hi');
            }
        }
    });
}

}
