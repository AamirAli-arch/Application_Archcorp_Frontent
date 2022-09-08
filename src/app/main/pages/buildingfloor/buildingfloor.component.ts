import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    OnInit,
    Output,
    QueryList,
    ViewChildren,
} from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ResourceService } from "../site-projection/service/resource.service";
import { FloorService } from "../buildingfloor/services/floor.service";
import { Observable } from "rxjs";
import { LoaderSpinerService } from "../loader-spiner/loader-spiner.service";

// export class Level {
//     createdOn: string;
//     levelName: string;
//     levelElementName: string;
//     roomArea: number;
//     roomName: string;
//     levelDetailList?: Level[] | undefined;
//     roomList?: Level[] | undefined;
// }

@Component({
    selector: "app-buildingfloor",
    templateUrl: "./buildingfloor.component.html",
    styleUrls: ["./buildingfloor.component.scss"],
})
export class BuildingfloorComponent implements OnInit {
    @ViewChildren('allTabs') allTabs!: QueryList<any>;
  
    searchTerm:string="";
    recursive: boolean = false;
    projectId: string;
    expand: any;
    startDate: string;
    endDate: string;
    treeData: Observable<any[]>;
    //filteredAndPaged: Observable<EmployeeLeaves[]>;
    selectionState;
    expandedNodes;
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
    newFloorList: any = [];
    levelDetail = [];
    roomData: any;
    floorArray: any = [];
    allData:any =[];
    gettabId:any=0;
    @Output() dataEvent = new EventEmitter<string>();
    constructor(
        private httpClient: HttpClient,   private _loaderService: LoaderSpinerService,
        private _service: ResourceService,
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef,
        private _floorService: FloorService
    ) {}

    ngOnInit() {
        this.filterForm = this.fb.group({  
            project: new FormControl(""),
        });

    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            if(this.gettabId==0){
                this.getFloorList(0);
            }
        });
    }

    tabChanged(tabChangeEvent: number) {
        this.gettabId=tabChangeEvent;
        if(this.gettabId==0){
            this.getFloorList(0);
        }
        // this._floorService.changeTabs(this.gettabId)
        // console.log('tabChangeEvent', tabChangeEvent)
    }

    weight(thickness: number, height: number, length: number): number {
        // feet to Suqare meter convert
        const thicknessMetter = thickness * 0.3048;
        const heightMetter = height * 0.3048;
        const lengthMetter = length * 0.3048;
        return (thicknessMetter * 15 + 0.03 * 22) * heightMetter * lengthMetter;
    }
    getFloorList(projectCode) {
        console.log('projectCode', projectCode)
        // this._loaderService.show();
        // get from JSON Data
        // this.httpClient.get("assets/data.json").subscribe((response: any) => {
        //     //if (response.length > 0) {
        //         this._loaderService.hide();
        //         if (response) {
        //         response = response.hits.hits[0]._source;
        //         this.treeData = response.level;
        //         this.allData=response.level;
        //         this.projectName = response.projectName;
        //         // this.projectDiscipline=response.projectDiscipline;
        //         this.propertyArea = response.propertyArea;
        //         this.createdBy = response.createdBy;
        //         this.updatedOn = this.fixDate(response.createdOn);
        //         this.dataSource = response.level;
        //     }
        // });
        // If you used API plz uncomment the below code
        this._floorService.getLevelDetail(projectCode).subscribe((response) => {
                this._loaderService.hide();
                console.log(response);
                if (response[0] && response[0].level) {
                //  response = response[0];
                this.treeData = response[0].level;
                this.allData=response[0].level;
                this.projectName = response[0].projectName;
                // this.projectDiscipline=response.projectDiscipline;
                this.propertyArea = response[0].propertyArea;
                this.createdBy = response[0].createdBy;
                this.updatedOn = this.fixDate(response[0].createdOn);
                this.dataSource = response[0].level;
            }
            else
            {
                this.treeData = null;


            }
        });

    }

    getprojectId(Id:any){
        this.projectId=Id;
        console.log('project ID', this.projectId)
        this.getFloorList(this.projectId);
    }

    fixDate(date) {
        date = new Date(date);
        let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
        let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
        date.setHours(hoursDiff);
        date.setMinutes(minutesDiff);
        return date;
    }

    // onChanges(): void {
    //     this.filterForm.valueChanges.subscribe((val) => {
    //        // console.log(val.project);
    //         this.getFloorList(val.project);
    //     });
    // }
    trackByFuntion(index, item) {
        return index;
      }
}
