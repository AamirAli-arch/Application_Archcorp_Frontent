import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

export interface CompletedClosedActivities {
  sno: number;
  projectName: string;
  stage: string;
  task: string;
  type: string;
  assignedBy: string;
  assignedDate: string;
  assignedHours: string;
  workedHours:string;
  status: string;
  action:string;
}

const Completed_Closed_Activities: CompletedClosedActivities[] = [
  {sno: 1, projectName: 'Sharjah Coop', stage: 'Concept Design', task:'Submission', type:'Project Planned Tasks',
  assignedBy:'Aamir Malik',assignedDate:new Date().toLocaleDateString().toString(), assignedHours:'9',workedHours:'9', status:'In Progress',action:'None',},
  {sno: 2, projectName: 'Kurdistan Gas Pipeline Network Development', stage: 'Concept Design', task:'Submission', type:'Project Planned Tasks',
  assignedBy:'Aaron Agnelo	Agnelo	DSouza',assignedDate:new Date().toLocaleDateString().toString(), assignedHours:'9',workedHours:'9', status:'Completed',action:'None',}
]

@Component({
  selector: 'app-completed-closed-tasks',
  templateUrl: './completed-closed-tasks.component.html',
  styleUrls: ['./completed-closed-tasks.component.scss']
})
export class CompletedClosedTasksComponent implements OnInit {

  
  displayedColumns: string[] = ['sno', 'projectName', 'stage', 'task','type','assignedBy','assignedDate','assignedHours',
  'workedHours','status','action'];

  dataSource = new MatTableDataSource(Completed_Closed_Activities);

  constructor() { }
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
