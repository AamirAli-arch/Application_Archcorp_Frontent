import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { DateSelectionModelChange } from '@angular/material/datepicker';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface ActivePendingActivities{  
  projectName: string;
  stage: string;
  deliverable: string;
  startDate: string;
  endDate: string;
  allocatedHours: string;
  assignedHours:string;
  balanceHours: string;  
}  


const Active_Pending_Activities:ActivePendingActivities[] = [
  { projectName: 'Sharjah Coop', stage: 'Concept Design', deliverable:'Submission', startDate:new Date().toLocaleDateString().toString(),
  endDate:new Date().toLocaleDateString().toString()+2,allocatedHours:'9', assignedHours:'9',balanceHours:'9'},
  {projectName: 'Kurdistan Gas Pipeline Network Development', stage: 'Concept Design', deliverable:'Report', startDate:new Date().toLocaleDateString().toString(),
  endDate:new Date().toLocaleDateString().toString()+2,allocatedHours:'9', assignedHours:'9',balanceHours:'9'}
]


@Component({
  selector: 'app-active-pending-activities',
  templateUrl: './active-pending-activities.component.html',
  styleUrls: ['./active-pending-activities.component.scss']
})
export class ActivePendingActivitiesComponent implements OnInit {

  displayedColumns: string[] = ['projectName', 'stage', 'deliverable','startDate','endDate','allocatedHours','assignedHours','balanceHours',
  ];

  items = ['Current Activities', 'Past Activities', 'Upcoming Activities'];
  expandedIndex = 0;

  panelOpenState = false;

  dataSource =new MatTableDataSource(Active_Pending_Activities);


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
