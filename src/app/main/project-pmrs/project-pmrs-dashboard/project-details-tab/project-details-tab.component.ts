import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface ProjectDetails{  
  projectName: string;
  stage: string;
  discipline: string;
  resources: string;
  startDate: string;
  endDate: string;
  description:string;
  status:string;
  location:string;
}  

const Project_Details:ProjectDetails[] = [
  { projectName: 'Sharjah Coop', stage: 'Concept Design',discipline:'Mechanical',resources:'Aaron Dsouza', startDate:new Date().toLocaleDateString().toString(),
  endDate:new Date().toLocaleDateString().toString(),description:'Sharjah Coop - Sharjah',status:'Active',location:'25.096870814241772, 55.16920128835389'},  
]

@Component({
  selector: 'app-project-details-tab',
  templateUrl: './project-details-tab.component.html',
  styleUrls: ['./project-details-tab.component.scss']
})
export class ProjectDetailsTabComponent implements OnInit {

displayedColumns: string[] = ['projectName', 'stage', 'discipline','resources','startDate','endDate','description','status','location',
];

items = ['Projects'];
expandedIndex = 0;

panelOpenState = false;

dataSource =new MatTableDataSource(Project_Details);

  

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
