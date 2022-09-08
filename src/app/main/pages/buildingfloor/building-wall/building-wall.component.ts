import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms"
import { FloorService } from "../services/floor.service";



@Component({
    selector: "app-building-wall",
    templateUrl: "./building-wall.component.html",
    styleUrls: ["./building-wall.component.scss"],
})
export class BuildingWallComponent implements OnInit {
    @Output() settabsId = new EventEmitter();

    getProjectId: number;
    projectId: string;
    startDate: string;
    endDate: string;
    treeData: any = {};
    projectName: string;
    searchTerm:string="";
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
    ) {
        console.log('sohan wall')
    }

    ngOnInit() {
        this.filterForm = this.fb.group({
            project: new FormControl(""),
        });

        // this._service.currentMessage.subscribe((response:any) =>{
        //     if(response==2){
        //         console.log('get tabs id ', response)
        //         this.getBuildingList(2741);
        //     }
        // })
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
        });
    }
    getBuildingList(projectCode){
        // get from JSON Data
        this.httpClient
            .get("assets/walldata.json")
            .subscribe((response: any) => {
                if (response) {
                    this.apiResponse = response[0];
                    const getData = response[0].project;
                    this.projectName = getData.projectName;
                    this.createdBy = getData.createdBy;
                    this.updatedBy = this.fixDate(getData.createdOn);
                    this.walldataArray = response[0].walls;
                    this.dataSource = response[0].walls;
                }
            });



            // If you used API plz uncomment the below code

            // this._service.getWallsData(2741)
            // .subscribe((response: any) => {
            //     if (response) {
            //         console.log("response", response);
            //         this.apiResponse = response[0];
            //         const getData = response[0].project;
            //         this.projectName = getData.projectName;
            //         this.createdBy = getData.createdBy;
            //         this.updatedBy = this.fixDate(getData.createdOn);
            //         this.walldataArray = response[0].walls;
            //         this.dataSource = response[0].walls;
            //     }
            // });
    }

    searchFilter(filterText: string) {
        if (filterText) {
            let filteredTreeData = [];
            this.newWallList = [];
            filteredTreeData = this.dataSource;
            filteredTreeData.forEach((element) => {
                console.log('element', element)
                if (
                    element.levelDetail.levelName
                        .toLocaleLowerCase()
                        .indexOf(filterText.toLocaleLowerCase()) > -1
                ) {
                    this.newWallList.push({ ...element });
                }
            });
            this.apiResponse.walls = this.newWallList;
        } else {
            this.apiResponse.walls = this.dataSource;
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
        this.getBuildingList(this.projectId);
    }
    // onChanges(): void {
    //     this.filterForm.valueChanges.subscribe((val) => {
    //         console.log(val.project);
    //         this.getBuildingList(val.project);
    //     });
    // }

    trackByFuntion(index, item) {
        return index;
      }
}
