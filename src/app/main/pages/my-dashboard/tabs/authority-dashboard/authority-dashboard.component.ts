
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {  Observable, of as observableOf } from 'rxjs';
import { FormGroup, FormBuilder, FormControl} from "@angular/forms";
import { DashboardService } from '../../services/dashboard.service';
import { GetSubmissions } from '../../services/submissions';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from "moment";
import { GetSubmissionCount } from '../../services/submission.count';
import { SubmissionsByStatusComponent } from 'app/main/pages/submissions-by-status/submissions-by-status.component';

// import { stringify } from 'querystring';
// import { FuseConfigService } from '@fuse/services/config.service';
// import { LoaderSpinerService } from 'app/main/pages/loader-spiner/loader-spiner.service';
// import { fuseAnimations } from '@fuse/animations';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-authority-dashboard',
  templateUrl: './authority-dashboard.component.html',
  styleUrls: ['./authority-dashboard.component.scss']
})
export class AuthorityDashboardComponent implements OnInit {
  moment = moment;
  displayedColumns = [
    "title",
    "plannedDate",
    "projectName",
    "submittedTo",
    "employees",
    "currentStatusString",
  ];

  dataSource;
  submission: GetSubmissions[];
  resultsLength = 0;
  message:'No Upcoming Submissions';
  getSubmissionId: any;
  filterForm: FormGroup
  filteredAndPaged: Observable<GetSubmissions[]>;
  confirmDialogRef: MatDialogRef<SubmissionsByStatusComponent>;

  dataSource1;
  submissionCount: GetSubmissionCount[];
  countLength = 0;
  overDueCount = 0;

  filterPaged : Observable<GetSubmissionCount[]>;

  
  // isLoadingResults = true;
  // submission_id: any;
  // filterList: any = [];
  // submissionArray: any = [];
  // submCount: any[];
  // isLoading : true;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private fb: FormBuilder,
    private _dashboardService: DashboardService,
    private _matDialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      name: new FormControl([])
    });
    this.getSubmissionList();
    this.getSubmissionCount();    
    this.getOverdueSubmissions();
  }

  
  getSubmissionList() {
    this._dashboardService.getUpcomingSubmissions().subscribe(response => {
      this.dataSource = response.upcomingSubmissionDtos;
      this.resultsLength = response.upcomingSubmissionDtos.length;        
      
    });

  }


  getSubmissionCount() {
    this._dashboardService.getSubmissionCount().subscribe(response => {
      this.dataSource1 = response.submissionCountDto;
      this.countLength = response.submissionCountDto.length;          
    });
  }

  getOverdueSubmissions(){
    this._dashboardService.getOverdueSubmissions().subscribe(response =>{  
      this.overDueCount = response.overdueSubmissionDto.length;              
    });
    
  }
  

  openDialog(selectedStatus){
    this.confirmDialogRef = this._matDialog.open(SubmissionsByStatusComponent, {
      disableClose: false,
      data :{
        status: selectedStatus
      }
    });
  }
}
