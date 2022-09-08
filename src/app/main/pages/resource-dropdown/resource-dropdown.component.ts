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
import { ResourcesService } from "../resources/services/resources.service";

export interface employee {
    id: number;
    name: string;
}


@Component({
  selector: 'app-resource-dropdown',
  templateUrl: './resource-dropdown.component.html',
  styleUrls: ['./resource-dropdown.component.scss']
})
export class ResourceDropdownComponent implements OnInit {
    public employeeArray: employee[];
    public employeeMultiCtrl: FormControl = new FormControl();
    storeId = [];
    @Output() employeeId = new EventEmitter();
    public employeeMultiFilterCtrl: FormControl = new FormControl();
    public filteredEmployeeMulti: ReplaySubject<employee[]> = new ReplaySubject<
        employee[]
    >(1);

    @ViewChild("multiSelect") multiSelect: MatSelect;
    protected _onDestroy = new Subject<void>();
    constructor(private _resourceService: ResourcesService) {}
    ngOnInit() {
        this.getEmployeeList();
    }
    getEmployeeList() {
        this._resourceService.getEmployees().subscribe((response: any) => {
            // this.employees = response.employees;
            this.employeeArray = response.employees;
            this.filteredEmployeeMulti.next(this.employeeArray.slice());
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
        let getemployeId=[]
        this.employeeMultiCtrl.value.forEach(element => {
            if(element.id){
                getemployeId.push(element.id)
            }
        });
        this.employeeId.emit([... new Set (getemployeId)]);
    }
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

     setInitialValue() {
        this.filteredEmployeeMulti
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.multiSelect.compareWith = (a: employee, b: employee) =>
                    a && b && a.id === b.id;
            });
    }

     filterEmployeeMulti() {
        if (!this.employeeArray) {
            return;
        }
        // get the search keyword
        let search = this.employeeMultiFilterCtrl.value;
        if (!search) {
            this.filteredEmployeeMulti.next(this.employeeArray.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter the employee
        this.filteredEmployeeMulti.next(
            this.employeeArray.filter(
                (employee) => employee.name.toLowerCase().indexOf(search) > -1
            )
        );
    }

}
