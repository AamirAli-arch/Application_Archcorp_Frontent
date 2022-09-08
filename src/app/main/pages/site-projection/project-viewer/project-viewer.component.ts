import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DatePipe } from "@angular/common";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { ReportsService } from "../../reports/services/reports.service";
import { AllocationProjectWise } from "../models/resource-request";
import { ResourceService } from "../service/resource.service";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
const moment = extendMoment(Moment);
import * as jsPDF from "jspdf";
//import jsPDF from 'jspdf'
import html2canvas from "html2canvas";
import "jspdf-autotable";

@Component({
    selector: "app-project-viewer",
    templateUrl: "./project-viewer.component.html",
    styleUrls: ["./project-viewer.component.scss"],
})
export class ProjectViewerComponent implements OnInit {
    @ViewChild("content", { static: false }) content: ElementRef;
    moment = moment;
    monthArray = [];
    filterForm: FormGroup;
    projectArray;
    setNewArray = [];
    todayDate: string;
    resourceRadio = [
        { name: "Resource", value: 1, checked: true },
        { name: "Project", value: 2 },
    ];
    selectedRadio;
    setActive = 1;
    allocationsArray = [];
    allocationsMonthArray = [];
    ressoureSetArray = [];
    startYear = new Date(new Date().getFullYear(), 0, 1);
    endYear = new Date(new Date().getFullYear(), 11, 31);
    yearArray = [];
    noRecords=false;
    project_Id:any;
    employeeId;
    constructor(
        private _snackBar: MatSnackBar,
        private datePipe: DatePipe,
        private _loaderService: LoaderSpinerService,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private _service: ResourceService,
        private _reportsService: ReportsService
    ) {}

    ngOnInit(): void {
        this.selectedRadio = this.resourceRadio[0].value;
        this.filterFormData();
        this.getAllMonth();
        this.getProjectListWeekWise();
        this.getProjectMonthWiseList();
    }
    filterFormData() {
        this.filterForm = this.fb.group({
            // project: new FormControl([]),
            startDate: new FormControl(this.startYear),
            endDate: new FormControl(this.endYear),
            designation: new FormControl([]),
            resource: new FormControl([]),
        });
    }
    projectId(Id:any){
        this.project_Id=Id;
        if (this.setActive == 1) {
            this.getProjectListWeekWise();
        } else {
            this.getProjectMonthWiseList();
        }
    }
    getEmployeValue(data:any){
        this.employeeId=data;
        if (this.setActive == 1) {
            this.getProjectListWeekWise();
        } else {
            this.getProjectMonthWiseList();
        }
    }
    addEvent(event: MatDatepickerInputEvent<Date>) {
        this.filterForm.get("startDate").valueChanges.subscribe((val) => {
            if (val) {
                this.startYear = this.fixDate(
                    this.filterForm.controls["startDate"].value
                );
            }
        });
        this.filterForm.get("endDate").valueChanges.subscribe((val) => {
            if (val) {
                this.endYear = this.fixDate(
                    this.filterForm.controls["endDate"].value
                );
                this.getAllMonth();
                if (this.setActive == 1) {
                    this.getProjectListWeekWise();
                } else {
                    this.getProjectMonthWiseList();
                }
            }
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            // this.getProjectListWeekWise();
            // this.getProjectMonthWiseList();
        }, 0);
    }
    SearchFilter() {
        if (this.setActive == 1) {
            this.getProjectListWeekWise();
        } else {
            this.getProjectMonthWiseList();
        }
    }
    getProjectMonthWiseList() {
        const request = new AllocationProjectWise();
        request.designations = this.filterForm.get("designation").value;
        request.employeeIds = this.employeeId
        request.startDate = this.filterForm.get("startDate").value;
        request.endDate = this.filterForm.get("endDate").value;
        request.projectIds = this.project_Id;
        this._loaderService.show();
        this._service
            .projectResourceListMonthWiase(request)
            .subscribe((response: any) => {
                if (response) {
                    this._loaderService.hide();
                    if (response.allocations.length === 0) {
                        this.allocationsMonthArray = [];
                        //this.getAllMonth();
                        this.noRecords = true;
                    } else {
                        this.noRecords = false;
                        this.allocationsMonthArray = response.allocations;
                    }
                }
            });
    }
    getProjectListWeekWise() {
        const request = new AllocationProjectWise();
        request.designations = this.filterForm.get("designation").value;
        request.employeeIds = this.employeeId;
        request.startDate = this.filterForm.get("startDate").value;
        request.endDate = this.filterForm.get("endDate").value;
        request.projectIds = this.project_Id;
        this._loaderService.show();
        this._service
            .projectResourceList(request)
            .subscribe((response: any) => {
                if (response) {
                    this._loaderService.hide();
                    if (response.allocations.length === 0) {
                        this.allocationsArray = [];
                        //this.getAllMonth();
                        this.noRecords = true;
                    } else {
                        this.noRecords = false;
                        this.allocationsArray = response.allocations;
                    }
                }
            });
    }
    radioChange(event) {
        this.selectedRadio = event.value;
    }
    buttonActive(id) {
        this.setActive = id;
        this.filterForm.controls["startDate"].setValue(
            new Date(new Date().getFullYear(), 0, 1)
        );
        this.filterForm.controls["endDate"].setValue(
            new Date(new Date().getFullYear(), 11, 31)
        );
        this.getAllMonth();
        if (this.setActive == 1) {
            this.filterFormData();
            this.getProjectListWeekWise();
        } else {
            this.filterFormData();
            this.getProjectMonthWiseList();
        }
    }
    // set multiple color of class
    renderClass(plan) {
        if (plan < 10) {
            return "plan-10";
        } else if (plan > 10 && plan <= 39) {
            return "plan-40";
        } else if (plan >= 40 && plan <= 69) {
            return "plan-60";
        } else if (plan >= 70 && plan <= 89) {
            return "plan-80";
        } else if (plan >= 90 && plan <= 100) {
            return "plan-90";
        } else if (plan > 100) {
            return "plan-100";
        }
    }
    getAllMonth() {
        // const startDate: any = moment(
        //     this.fixDate(this.startYear),
        //     "DD-MMM-YYYY"
        // );
        // const endDate: any = moment(this.fixDate(this.endYear), "DD-MMM-YYYY");
        const startDate: any = moment(
            this.fixDate(this.filterForm.controls["startDate"].value),
            "DD-MMM-YYYY"
        );
        const endDate: any = moment(
            this.fixDate(this.filterForm.controls["endDate"].value),
            "DD-MMM-YYYY"
        );
        const FirstDateYear = startDate.clone().add(-1, "month");
        this.yearArray = [];
        this.monthArray = [];
        while (+FirstDateYear.add(1, "month") < +endDate) {
            this.yearArray.push({
                name: FirstDateYear.format("MMMM YYYY"),
            });
        }
        this.yearArray.forEach((element) => {
            if (element.name) {
                const firstDay = moment(element.name).startOf("month");
                const endDay = moment(element.name)
                    .endOf("month")
                    .subtract(6, "day");
                const monthRange = moment.range(firstDay, endDay);
                const weeks = [];
                for (let mday of monthRange.by("days")) {
                    if (weeks.indexOf(mday.week()) === -1) {
                        weeks.push(mday.week());
                    }
                }
                this.monthArray.push({ name: element.name, weekDay: weeks });
            }
        });
    }

    fixDate(date) {
        date = new Date(date);
        let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
        let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
        date.setHours(hoursDiff);
        date.setMinutes(minutesDiff);
        return date;
    }

    downloadPDF() {
        let DATA = document.getElementById("content");
        html2canvas(DATA).then((canvas) => {
            let fileWidth = 208;
            let fileHeight = (canvas.height * fileWidth) / canvas.width;
            const FILEURI = canvas.toDataURL("image/png");
            let PDF = new jsPDF("p", "mm", "a4");
            let position = 0;
            PDF.addImage(FILEURI, "PNG", 0, position, fileWidth, fileHeight);
            PDF.save("resource-report.pdf");
        });
    }
}
