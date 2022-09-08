import {
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSelect } from "@angular/material/select";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FloorService } from "../services/floor.service";


export interface project {
    projectCode: number;
    projectName: string;
}

@Component({
  selector: 'app-project-search-dropdown',
  templateUrl: './project-search-dropdown.component.html',
  styleUrls: ['./project-search-dropdown.component.scss']
})
export class ProjectSearchDropdownComponent implements OnInit {
    public projectArray: project[];
    public employeeMultiCtrl: FormControl = new FormControl();
    storeId = [];
    @Output() projectId = new EventEmitter();
    public employeeMultiFilterCtrl: FormControl = new FormControl();
    public filteredEmployeeMulti: ReplaySubject<project[]> = new ReplaySubject<
    project[]
    >(1);

    @ViewChild("multiSelect") multiSelect: MatSelect;
    protected _onDestroy = new Subject<void>();
   
    constructor(private _service: FloorService) {}
    ngOnInit() {
        this.getProjetcList();
    }
    getProjetcList() {
        this._service.getProjectList().subscribe((response) => {
            console.log('response',response)
            this.projectArray = response.projects;
            this.filteredEmployeeMulti.next(this.projectArray.slice());
            // listen for search field value changes
            this.employeeMultiFilterCtrl.valueChanges
                .pipe(takeUntil(this._onDestroy))
                .subscribe(() => {
                    this.filterEmployeeMulti();
                });
        });
    }
    ngAfterViewInit() {
       this.setInitialValue();
    }
    getId(id: any) {
        //let getemployeId=[]
        // this.employeeMultiCtrl.value.forEach(element => {
        //     if(element.projectCode){
        //         getemployeId.push(element.projectCode)
        //     }
        // });
        this.projectId.emit(id);
    }
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

     setInitialValue() {
        this.filteredEmployeeMulti
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.multiSelect.compareWith = (a: project, b: project) =>
                    a && b && a.projectCode === b.projectCode;
            });
    }

     filterEmployeeMulti() {
        if (!this.projectArray) {
            return;
        }
        // get the search keyword
        let search = this.employeeMultiFilterCtrl.value;
        if (!search) {
            this.filteredEmployeeMulti.next(this.projectArray.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter the employee
        this.filteredEmployeeMulti.next(
            this.projectArray.filter(
                (employee) => employee.projectName.toLowerCase().indexOf(search) > -1
            )
        );
    }

}
