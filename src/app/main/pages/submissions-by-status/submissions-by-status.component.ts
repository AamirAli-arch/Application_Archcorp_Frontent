import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FuseConfigService } from '@fuse/services/config.service';
import { MatPaginator } from '@angular/material/paginator';
import { fuseAnimations } from '@fuse/animations';
import { Observable, of as observableOf } from 'rxjs';
import { LoaderSpinerService } from "../loader-spiner/loader-spiner.service";
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms";
import { SubmissionStatusService } from './services/submission-status.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from "moment";
import {GetSubmissionsStatus} from './services/submission-status';


@Component({
  selector: 'app-submissions-by-status',
  templateUrl: './submissions-by-status.component.html',
  styleUrls: ['./submissions-by-status.component.scss'],
  animations   : fuseAnimations
})
export class SubmissionsByStatusComponent implements OnInit {
  moment = moment;
  displayedColumns = [    
     "title",
     "plannedDate",     
     "projectName",
     "submittedTo",
     "employees",
     "currentStatusString",   
  ];
  dataSource3:any=[];
  submissionStatus : GetSubmissionsStatus[];
  getSubmissionId:any;
  filterForm: FormGroup
  filteredAndPaged : Observable<GetSubmissionsStatus[]>;
  isLoadingResults =true;
  submission_id: any;
  filterList:any=[];
  submissionStatusArray:any=[];
  statusId: any;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _submissionStatusService: SubmissionStatusService,     
    private _httpClient: HttpClient,
    private _loaderService: LoaderSpinerService,
    private _fuseConfigService: FuseConfigService) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      name: new FormControl([])
      
    });
    if(this.data.status == 6){
      this.getOverdueSubmissions();
    }
    else{
    this.submissionsByStatus(this.data.status);    
  }
  }

  submissionsByStatus(request) {        
    this._submissionStatusService.submissionsByStatus(request).subscribe(response => {
     this.dataSource3 = response.submissionsByStatusDtos;        
    });
  }   

  getOverdueSubmissions(){
    this._submissionStatusService.getOverdueSubmissions().subscribe(overDueReponse =>{      
      this.dataSource3 = overDueReponse.overdueSubmissionDto;      
    });
  }

}
