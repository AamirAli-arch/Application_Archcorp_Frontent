import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Observable } from "rxjs/internal/Observable";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { ResourceService } from "../../site-projection/service/resource.service";
import { FloorService } from "../services/floor.service";

@Component({
    selector: "app-error-project-list",
    templateUrl: "./error-project-list.component.html",
    styleUrls: ["./error-project-list.component.scss"],
})
export class ErrorProjectListComponent implements OnInit {
    searchTerm: string = "";
    treeData:any[];
    allData: any;
    projectName: string;
    propertyArea: any;
    createdBy: string;
    updatedOn: string;
    dataSource: any;
    projectCode: number;
    newErrorList: any[];
    constructor(
        private _loaderService: LoaderSpinerService,
        private _service: ResourceService,
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef,
        private _floorService: FloorService,
        private httpClient: HttpClient
    ) {}

    ngOnInit(): void {
        this.getErrorList(0);
    }
    weight(thickness: number, height: number, length: number): number {
        // feet to Suqare meter convert
        const thicknessMetter = thickness * 0.3048;
        const heightMetter = height * 0.3048;
        const lengthMetter = length * 0.3048;
        return (thicknessMetter * 15 + 0.03 * 22) * heightMetter * lengthMetter;
    }
    getErrorList(projectCode) {
        console.log("projectCode", projectCode);
        // this._loaderService.show();
        // get from JSON Data
        // this.httpClient
        //     .get("assets/errorlist.json")
        //     .subscribe((response: any) => {
        //         // console.log('response', response)
        //         this._loaderService.hide();
        //         if (response) {
        //            const getdata = response.hits.hits[0]._source;
        //             this.treeData = getdata.level;
        //             this.projectName = getdata.projectName;
        //             // this.projectDiscipline=response.projectDiscipline;
        //             this.projectCode = getdata.code;
        //             this.createdBy = getdata.createdBy;
        //             this.updatedOn = this.fixDate(getdata.createdOn);
        //             this.dataSource = getdata.level;
        //         } else {
        //             this.treeData=null;
        //         }
        //     });
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
                this.projectCode = response[0].code;
            }
            else
            {
                this.treeData = null;

            }
        });
    }

    searchFilter(filterText: string) {
        if (filterText) {
            let filteredTreeData = [];
            let setNewArrayList = [];
            filteredTreeData = this.dataSource;
            filteredTreeData.forEach((element) => {
                console.log('element', element)
                this.newErrorList = [];
                element.errorsList.forEach(errorName => {
                    if (element.levelName.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1 || errorName.name.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1
                    || errorName.id.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1) {
                        this.newErrorList.push({ ...errorName });
                    }
                });
                if (this.newErrorList.length > 0) {
                    setNewArrayList.push({
                        ...element,
                        errorsList: [...new Set(this.newErrorList)],
                    });
                }
            });
            this.treeData = setNewArrayList;
        } else {
            this.treeData = this.dataSource;
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
    getprojectId(id: any) {
        this.getErrorList(id);
    }
    trackByFuntion(index, item) {
        return index;
    }

}
