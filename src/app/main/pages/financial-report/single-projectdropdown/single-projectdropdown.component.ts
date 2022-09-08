import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSelect } from "@angular/material/select";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ResourceService } from "../../site-projection/service/resource.service";

export interface project {
    id: number;
    projectName: string;
}

@Component({
    selector: "app-single-projectdropdown",
    templateUrl: "./single-projectdropdown.component.html",
    styleUrls: ["./single-projectdropdown.component.scss"],
})
export class SingleProjectdropdownComponent implements OnInit {
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
    constructor(private _service: ResourceService) {}
    @Input() projectName: any;
    ngOnInit() {
        this.getProjetcList();
    }
    getProjetcList() {
        this._service.getProjectList().subscribe((response) => {
            this.projectArray = response.projects;
            if (this.projectName) {
                this.projectArray.forEach((element, i) => {
                    if (this.projectName === element.projectName) {
                        this.employeeMultiCtrl.setValue(
                            this.projectArray[i].projectName
                        );
                        this.projectId.emit(this.projectArray[i].id);
                    }
                });
                this.filteredEmployeeMulti.next(this.projectArray.slice());
            } else {
                this.filteredEmployeeMulti.next(this.projectArray.slice());
                // listen for search field value changes
                this.employeeMultiFilterCtrl.valueChanges
                    .pipe(takeUntil(this._onDestroy))
                    .subscribe(() => {
                        this.filterEmployeeMulti();
                    });
            }
        });
    }
    ngAfterViewInit() {
       // this.setInitialValue();
    }
    getId(id: any) {
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
                    a && b && a.id === b.id;
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
                (employee) =>
                    employee.projectName.toLowerCase().indexOf(search) > -1
            )
        );
    }
}
