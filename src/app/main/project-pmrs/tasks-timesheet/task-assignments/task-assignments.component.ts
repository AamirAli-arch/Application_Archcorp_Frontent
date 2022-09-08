import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { DateSelectionModelChange } from '@angular/material/datepicker';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface Assignments{
  sno: number;
  projectName: string;  
  stage: string;
  task: string;
  type: string;
  assignedBy : string;
  assignedDate: string;
  assignedHours:string;
  workedHours: string;
  status: string;
  action: string;

}  



const Project_Assignments:Assignments[] = [
  {sno: 1, projectName: 'Sharjah Coop', stage: 'Concept Design', task:'Submission', type:'Project Planned Tasks',
  assignedBy:'Aamir Malik',assignedDate:new Date().toLocaleDateString().toString(), assignedHours:'9',workedHours:'9', status:'In Progress',action:'None',},
  {sno: 2, projectName: 'Kurdistan Gas Pipeline Network Development', stage: 'Concept Design', task:'Submission', type:'Project Planned Tasks',
  assignedBy:'Aaron Agnelo	Agnelo	DSouza',assignedDate:new Date().toLocaleDateString().toString(), assignedHours:'9',workedHours:'9', status:'Completed',action:'None',}
]

@Component({
  selector: 'app-task-assignments',
  templateUrl: './task-assignments.component.html',
  styleUrls: ['./task-assignments.component.scss']
})
export class TaskAssignmentsComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'projectName', 'stage', 'task','type','assignedBy','assignedDate','assignedHours',
  'workedHours','status','action'];

  items = ['Current Tasks', 'Previous Tasks', 'Upcoming Tasks'];
  expandedIndex = 0;

  dataSource =new MatTableDataSource(Project_Assignments);

  tasksTimesheetForm: FormGroup;
  projectSelected : string;
  taskTypeSelected : string;
  
  panelOpenState = false;

  taskTypes =[
    {id:'1',name:'Project Planned Tasks'},
    {id:'2',name:'Self Allocated Tasks'},
    {id:'3',name:'Self Planned Tasks'},
    {id:'4',name:'Project Non Planned Tasks'},    
  ]  

  projects =[
    {id:'1',name:'Sharjah Coop'},
    {id:'2',name:'Kurdistan Gas Pipeline Network Development'},
    {id:'3',name:'HE ASAD Modification 318, E25 Al Nahyan, Abu Dhabi'},
    {id:'4',name:'G+8 Residential Building at DSO '},
    {id:'5',name:'Al Maimoon Majlis Al Dhaid'},    
    {id:'6',name:'AGMC BMW Showroom Nad Al Hamar'},    
    {id:'7',name:'Village Villa'},    
    {id:'8',name:'Abu Dhabi Existing Villa'},  
    {id:'9',name:'Al Dhaid Mosque - Sharjah'},  
    {id:'10', name:'AGMC BMW Showroom Sharjah'}
  ]  

  constructor( private fb: FormBuilder) { }
  @ViewChild(MatSort) sort: MatSort;
  


  ngOnInit(): void {
    this.tasksTimesheetForm = this.fb.group({
      projectName: new FormControl(""),      
      taskType: new FormControl(""),
      startDate: new FormControl(""),
      endDate: new FormControl(""), 
  });
  
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


}
