
import { Component,AfterViewInit,OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { LoaderSpinerService } from "app/main/pages/loader-spiner/loader-spiner.service";
import { MatPaginator } from "@angular/material/paginator";

import {FormGroup,FormBuilder,FormControl} from "@angular/forms";
import { SubmittalService } from "./services/submittal.service";
import {Submittal,SubmittalRequest,SubmittalResponse} from "./services/model/submittal";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import { merge, Observable, of as observableOf } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogActions } from '@angular/material/dialog';
import { Router } from '@angular/router';


const moment = extendMoment(Moment);

@Component({
    selector: "app-submittals",
    templateUrl: "./submittals.component.html",
    styleUrls: ["./submittals.component.scss"],
    //encapsulation: ViewEncapsulation.None,
     animations   : fuseAnimations
})

// export class SubmittalsComponent implements OnInit {
//   submittals$: Observable<Submittal>
//   isLoading: true;


  export class SubmittalsComponent implements OnInit {
    moment = moment;
    displayedColumns = [        
        "ProjectName",
        "Name",
        "Verb",
        "StartDate",
        "EndDate",
        "Id",
        "EmployeeId",
        "CreatedBy",
        "ProjectId",
        "TaskResourceId"
        
    ];
    getId: any;
    dataSource: SubmittalService | null;
    submittals: any[];
    resultsLength = 0;
    filteredAndPaged: Observable<Submittal[]>;
    dataSource1: SubmittalResponse;
    

    filterForm: FormGroup;
    isLoadingResults = true;
    filterList:any=[];
    submittalsArray:any=[];
    project_Id:any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
  
  
    
    constructor(private fb: FormBuilder, private _submittalService:SubmittalService, private _httpClient: HttpClient,private _fuseConfigService: FuseConfigService,
        private _loaderService: LoaderSpinerService,
    private dialog: MatDialog) {}
    // ngAfterViewInit(): void {
    //     throw new Error("Method not implemented.");
    // }

    // ngAfterViewInit(): void {
    //     throw new Error("Method not implemented.");
    //     this.getSubmittalsList();
    // }

  ngOnInit(): void {
    //const token = localStorage.getItem("token");
    //const parsed = JSON.parse(atob(token.split('.')[1]));    
    //this.getSubmittalsList();
    this.getSumbmittals_v1();

    this.filterForm = this.fb.group({
        name: new FormControl([]),
        startDate: new FormControl(""),
        endDate: new FormControl(""),
       
    });
  }

  getSumbmittals_v1(){
      console.log("v1");
      this.dataSource = new SubmittalService(this._httpClient);
      const request = new SubmittalRequest(); 
      request.projectIds =  this.project_Id;  
      request.riskCase = 1;     
      let result = this._submittalService.getSubmittalData(request).subscribe(response => {
        console.log(response)
        this.dataSource1 = response;
      });
  }

    
getSubmittalsList() {
    console.log("getsubmittalList");
    this.dataSource = new SubmittalService(this._httpClient);

        this.filteredAndPaged = merge(            
            this.filterForm.get("projectId").valueChanges
        ).pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                const request = new SubmittalRequest(); 
                request.projectIds =  this.project_Id;  
                request.riskCase = 1;                     
                this._loaderService.show();
                return this._submittalService.getSubmittalData(request);
            }),
            map((data) => {
                console.log("servoice data", data)
                this._loaderService.hide();
                this.resultsLength = data.totalCount;
                return data.submittal;
            }),
            catchError(() => {
                this._loaderService.hide();
                return observableOf([]);
            })
        );
}

getEmployeValue(data: any) {
    this.getId = data;
    this.getSubmittalsList();
}

projectId(Id:any){
    this.project_Id=Id[0];
    this.getSumbmittals_v1();
}
 
}
