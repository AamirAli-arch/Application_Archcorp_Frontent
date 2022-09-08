import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { FloorService } from '../services/floor.service';

@Component({
  selector: 'app-floorfinishload',
  templateUrl: './floorfinishload.component.html',
  styleUrls: ['./floorfinishload.component.scss']
})
export class FloorfinishloadComponent implements OnInit {
    searchTerm:string="";
    getProjectId: number;
    projectId: string;
    startDate: string;
    endDate: string;
    treeData: any = {};
    projectName: string;

    filterForm: FormGroup;
    projectArray: any;
    dataSource: any;
    projectDiscipline: string;
    propertyArea: number;
    createdBy: string;
    updatedBy: string;
    updatedOn: string;
    newRoomList = [];
    newWallList: any = [];
    levelDetail = [];
    roomData: any;
    floorArray: any = [];
    groundFloor: any = [];
    apiResponse: any = [];
    walldataArray: any = [];
    constructor(
        private fb: FormBuilder,
        private httpClient: HttpClient,
        private cdr: ChangeDetectorRef,
        private _service: FloorService
    ) {}

    ngOnInit() {
        console.log('sohan floor')
        this.filterForm = this.fb.group({
            project: new FormControl(""),
        });

        // this._service.currentMessage.subscribe((response:any) =>{
        //     if(response==1){
        //         console.log('get tabs id ', response)
        //         this.getfloorData(2741);
        //     }
        // })
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getfloorData(2741);
        });
    }
    getfloorData(projectCode){
        // get from JSON Data
        this.httpClient
            .get("assets/floorfinishload.json")
            .subscribe((response: any) => {
                console.log("floorfinishload.json", response);
                if (response) {
                    const getData = response;
                    this.projectName = getData.projectName;
                    this.createdBy = getData.createdBy;
                    this.projectDiscipline= getData.projectDiscipline;
                    this.propertyArea= getData.propertyArea;
                    this.updatedBy = this.fixDate(getData.createdOn);
                    this.walldataArray = response.levels;
                    this.dataSource = response.levels;
                }
            });

            // If you used API plz uncomment the below code

            // this._service.getWallsData(2741)
            // .subscribe((response: any) => {
            //     if (response) {
            //         const getData = response;
            //         this.projectName = getData.projectName;
            //         this.createdBy = getData.createdBy;
            //         this.projectDiscipline= getData.projectDiscipline;
            //         this.propertyArea= getData.propertyArea;
            //         this.updatedBy = this.fixDate(getData.createdOn);
            //         this.walldataArray = response.levels;
            //         this.dataSource = response.levels;
            //     }
            // });
    }

    searchFilter(filterText: string) {
        if (filterText) {
            let filteredTreeData = [];
            let setNewArrayList = [];
            filteredTreeData = this.dataSource;
            filteredTreeData.forEach((element) => {
                this.newWallList = [];
                element.areas.forEach(areaName => {
                  //  console.log('element',  areaName)
                    if (element.name.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1 || areaName.name.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1) {
                        this.newWallList.push({ ...areaName });
                    }
                });
                if (this.newWallList.length > 0) {
                    setNewArrayList.push({
                        ...element,
                        areas: [...new Set(this.newWallList)],
                    });
                }
            });
            this.walldataArray = setNewArrayList;
        } else {
            this.walldataArray = this.dataSource;
        }
    }

    fixDate(date) {
        date = new Date(date);
        let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
        let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
        date.setHours(hoursDiff);
        date.setMinutes(minutesDiff);
        return date;
    }

    getprojectId(Id:any){
        this.projectId=Id;
        console.log('project ID', this.projectId)
        this.getfloorData(this.projectId);
    }
    // onChanges(): void {
    //     this.filterForm.valueChanges.subscribe((val) => {
    //         console.log(val.project);
    //         this.getfloorData(val.project);
    //     });
    // }
    trackByFuntion(index, item) {
        return index;
      }

}
