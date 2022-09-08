import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { GetAllProjectsResponse, ProjectClient } from './services/ApiServices'
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogActions } from '@angular/material/dialog';
import { CreateProjectComponent } from './create-project/create-project.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<GetAllProjectsResponse>;
  isLoading = true;
  canCreateProject = false;
  searchProjectName = '';
  edtidelte = -1;
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _projectClient : ProjectClient,private router: Router,
    private dialog: MatDialog) { }
  ngOnInit(): void {
    const token = localStorage.getItem("token");
    const parsed = JSON.parse(atob(token.split('.')[1]));
    let empId = parsed.empId;
    if(empId == 1 || empId == 18 || empId == 35 || empId == 31 || empId == 20 || empId == 47 || empId == 85 || empId == 76){
      this.canCreateProject = true;
    }
    this.getProjects();
  }
  // Search Project Name
  applyFilter(filterValue: string) {
   // this.projects$ = filterValue.trim().toLowerCase();

  }
  getProjects(){
    this.projects$ = this._projectClient.projects();
  }
  awardProject(id){
    this.router.navigate(["award-project/add/"+id]);
  }
  scopeViewProject(id){
    this.router.navigate(["award-project/view/"+id]);
  }
  contract(id){
    this.router.navigate(["award-project/detail-contract"]);
  }
  createProject(projectId:any) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass="projectassignComponent"
    dialogConfig.data=projectId;

    this.dialog.open(CreateProjectComponent, dialogConfig);
  }

  editDelete(index) {
    if (this.edtidelte === index) {
        this.edtidelte = -1;
    } else {
        this.edtidelte = index;
    }
}

resourceAllocation(id:any){
    this.router.navigate(["budgetedhours/resource-allocation/"+id]);
}

budgetHours(id:any){
    this.router.navigate(["budgetedhours/add/"+id]);
}

}
