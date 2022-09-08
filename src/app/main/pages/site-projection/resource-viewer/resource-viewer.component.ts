import { DatePipe } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);
import { Observable } from "rxjs";
import { LoaderSpinerService } from "../../loader-spiner/loader-spiner.service";
import { ReportsService } from "../../reports/services/reports.service";

import { AllocationProjectWise } from "../models/resource-request";
import { ResourceService } from "../service/resource.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import * as jsPDF from "jspdf";
//import jsPDF from 'jspdf'
import html2canvas from "html2canvas";


@Component({
    selector: "app-resource-viewer",
    templateUrl: "./resource-viewer.component.html",
    styleUrls: ["./resource-viewer.component.scss"],
})
export class ResourceViewerComponent implements OnInit {
    @ViewChild("content", { static: false }) content: ElementRef;
    @ViewChild("TABLE") table: ElementRef;
    moment = moment;
    //testing
    projectDays = 100;
    monthArray = [];
    filteredAndPaged: Observable<[]>;
    filterForm: FormGroup;
    projectArray;
    startMonth;
    endMonth;
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
    dateArray = [];
    noRecords = false;
    getWeekArray: any = [];
    project_Id:any;
    employees:any=[];
    employeeArray:any;
    employeeId;
    constructor(
        private _snackBar: MatSnackBar,
        private datePipe: DatePipe,
        private _loaderService: LoaderSpinerService,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private _service: ResourceService,
        private _reportsService: ReportsService
    ) {

    }
    ngOnInit(): void {
        this.selectedRadio = this.resourceRadio[0].value;
        this.filterFormData();
        this.getAllMonth();
        this.getResourceListWeekWise();
        this.getResourceListMonthWise();
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
      getResourceListWeekWise() {
        const request = new AllocationProjectWise();
        request.designations = this.filterForm.get("designation").value;
        request.employeeIds = this.employeeId;
        request.startDate = this.filterForm.get("startDate").value;
        request.endDate = this.filterForm.get("endDate").value;
        request.projectIds = this.project_Id;
        this._loaderService.show();
        this._service
            .resourceListWeekWiase(request)
            .subscribe((response: any) => {
                if (response) {
                    if (response.allocations.length === 0) {
                        this.allocationsArray = [];
                        this.noRecords = true;
                    } else {
                        this.noRecords = false;
                        this.allocationsArray = response.allocations;
                    }
                    setTimeout(() => {
                        this._loaderService.hide();
                    }, 2000);
                }
            });
    }
    getResourceListMonthWise() {
        const request = new AllocationProjectWise();
        request.designations = this.filterForm.get("designation").value;
        request.employeeIds = this.employeeId;
        request.startDate = this.filterForm.get("startDate").value;
        request.endDate = this.filterForm.get("endDate").value;
        request.projectIds = this.project_Id;
        this._loaderService.show();
        this._service
            .resourceListMonthWiase(request)
            .subscribe((response: any) => {
                if (response) {
                    if (response.allocations.length === 0) {
                        this.allocationsMonthArray = [];
                        this.noRecords = true;
                    } else {
                        this.noRecords = false;
                        this.allocationsMonthArray = response.allocations;
                    }
                    setTimeout(() => {
                        this._loaderService.hide();
                    }, 2000);
                }
            });
    }
    projectId(Id:any){
        this.project_Id=Id;
        if (this.setActive == 1) {
            this.filterFormData();
            this.getResourceListWeekWise();
        } else {
            this.filterFormData();
            this.getResourceListMonthWise();
        }
    }
    getEmployeValue(data:any){
        this.employeeId=data;
        if (this.setActive == 1) {
            this.filterFormData();
            this.getResourceListWeekWise();
        } else {
            this.filterFormData();
            this.getResourceListMonthWise();
        }
    }
    addEvent(event: MatDatepickerInputEvent<Date>) {
        this.getAllMonth();
        if (this.setActive == 1) {
            this.getResourceListWeekWise();
        } else {
            this.getResourceListMonthWise();
        }
    }
    SearchFilter() {
        if (this.setActive == 1) {
            this.getResourceListWeekWise();
        } else {
            this.getResourceListMonthWise();
        }
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            // this.getResourceListMonthWise();
            // this.getResourceListWeekWise();
        }, 0);
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

    getLeaveWidth(sub: any) {
        const leaveStartWeek = this.moment(sub.startDate).week();
        const leaveEndWeek = this.moment(sub.endDate).week();
        const leaveDays = sub.noOfDays;
        let calculatedWidth = 0;
        calculatedWidth = 7 * leaveDays;
        return {
            width: `${calculatedWidth}` + "px",
        };
        // if(leaveDays < 6){
        //     const leaveDiff = leaveEndWeek - leaveStartWeek;

        //     calculatedWidth = 50 * (leaveDiff + 1);
        //     return {
        //         'width' : `${calculatedWidth}` + 'px',
        //     }
        // }
    }

    calculateLeaveData(sub: any) {
        const stepStartDate = this.moment(sub.startDate);
        const stepEndDate = this.moment(sub.endDate);
        const projectStartDate = this.moment(this.startYear);
        const projectEndDate = this.moment(this.endYear);
        let i = 0;
        let firstDays = 1;
        let lastDay = 1;
        for (
            var m = moment(projectStartDate);
            m.isSameOrBefore(projectEndDate);
            m.add(1, "days")
        ) {
            i++;
            if (stepStartDate.startOf("day").isSame(m.startOf("day"))) {
                firstDays = i;
            }
            if (stepEndDate.startOf("day").isSame(m.startOf("day"))) {
                lastDay = i + 1;
            }
        }

        return {
            "grid-column": `${Math.abs(firstDays)} / ${Math.abs(lastDay)}`,
        };
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
            this.getResourceListWeekWise();
        } else {
            this.filterFormData();
            this.getResourceListMonthWise();
        }
    }

    getAllMonth() {
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
        //get Arry month of years
        while (+FirstDateYear.add(1, "month") < +endDate) {
            this.yearArray.push({
                name: FirstDateYear.format("MMMM YYYY"),
            });
        }
        //get Array of weeks from months

        this.yearArray.forEach((element) => {
            if (element.name) {
                const firstDay = moment(element.name).startOf("month");
                const endDay = moment(element.name)
                    .endOf("month")
                    .subtract(6, "days");
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
