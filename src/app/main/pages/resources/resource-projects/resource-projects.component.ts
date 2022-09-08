import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ResourceProjects, ViewAssignmentData } from '../models/resources';
import { ViewAssignmentsComponent } from '../view-assignments/view-assignments.component';

@Component({
  selector: 'app-resource-projects',
  templateUrl: './resource-projects.component.html',
  styleUrls: ['./resource-projects.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResourceProjectsComponent implements OnInit {

  @Input() projects: ResourceProjects;
  @Input() resourceId: number;

  
  constructor(
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onProjectClick(resourceId, projectId){
    const assigment = new ViewAssignmentData();
    assigment.employeeId = resourceId;
    assigment.projectId = projectId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = assigment;
    dialogConfig.panelClass="taskallocation"
    dialogConfig.disableClose = false;

    const dialogRef = this.dialog.open(ViewAssignmentsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      
    );
  }

}
