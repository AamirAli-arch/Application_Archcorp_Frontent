import { Component, OnInit, Input } from "@angular/core";
import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
    CdkDrag,
} from "@angular/cdk/drag-drop";
import { differenceInHours, set, differenceInMinutes } from "date-fns";
@Component({
    selector: "app-gantt-resource-allocation",
    templateUrl: "./gantt-resource-allocation.component.html",
    styleUrls: ["./gantt-resource-allocation.component.scss"],
})
export class GanttResourceAllocationComponent implements OnInit {
    @Input() stratDate: any;
    @Input() endDate: any;
    @Input() tasks: any;
    @Input() theme: "material" | "gradient" | null = "material";
    stratDateHour: number;
    today = new Date();
    selectedDate = this.today;
    workingHours: number;
    constructor() {
        this.tasks = [
            {
                Resource: "sohan",
                project: [
                    {
                        Name: "gantChart",
                        stratDate: "21-06-2021",
                        endDate: "10-07-2021",
                        progress: "50%",
                    },
                    {
                        Name: "gantChart",
                        stratDate: "21-06-2021",
                        endDate: "10-07-2021",
                        progress: "50%",
                    },
                    {
                        Name: "gantChart",
                        stratDate: "21-06-2021",
                        endDate: "10-07-2021",
                        progress: "50%",
                    },
                    {
                        Name: "gantChart",
                        stratDate: "21-06-2021",
                        endDate: "10-07-2021",
                        progress: "50%",
                    },
                    {
                        Name: "gantChart",
                        stratDate: "21-06-2021",
                        endDate: "10-07-2021",
                        progress: "50%",
                    },
                ],
            },
        ];
    }

    ngOnInit(): void {
      
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.prepareChart();
            this.prepareTasks();
        }, 0);
    }
    prepareChart() {
        //this.stratDateHour = this.getHourFromTime(this.stratDate);
        this.workingHours =
            this.diffFromTime(this.endDate, this.stratDate, "hours") + 2;
            
    }
    prepareTasks() {
        this.tasks.map((task) => {
           
            task.width = this.diffFromTime(task.end, task.start, "minutes") * 2;
            task.offset =
                this.diffFromTime(task.start, this.stratDate, "minutes") * 2;
            if (task.statusList) {
                task.statusList.map((status, index) => {
                    status.offset =
                        this.diffFromTime(
                            status.start,
                            this.stratDate,
                            "minutes"
                        ) * 2;
                    if (
                        task.statusList[index + 1] &&
                        task.statusList[index + 1].start
                    ) {
                        status.end = task.statusList[index + 1].start;
                        status.width =
                            this.diffFromTime(
                                status.end,
                                status.start,
                                "minutes"
                            ) * 2;
                    }
                });
            }
        });
    }
    onTaskClick(clickedTask) {
        if (clickedTask.isParent) {
            this.tasks.filter((task) => {
                if (task.parentID === clickedTask.id) {
                    task.isHidden = !task.isHidden;
                    clickedTask.active = !clickedTask.active;
                }
            });
        }
    }
    getHourFromTime(timeStr) {
        return Number(timeStr);
    }
    getMinuteFromTime(timeStr) {
        return Number(timeStr);
    }
    diffFromTime(endTime, StartTime, returnFormat: "hours" | "minutes") {
        const [endTimeHour, endTimeMinute] = endTime;
        const [StartTimeHour, StartTimeMinute] = StartTime;
      
        const taskEndDate = set(this.today, {
            hours: endTimeHour,
            minutes: endTimeMinute,
            seconds: 0,
        });
        const taskStartDate = set(this.today, {
            hours: StartTimeHour,
            minutes: StartTimeMinute,
            seconds: 0,
        });
        let res;
        switch (returnFormat) {
            case "hours":
                res = differenceInHours(
                    new Date(taskEndDate),
                    new Date(taskStartDate)
                );
                break;
            case "minutes":
                res = differenceInMinutes(
                    new Date(taskEndDate),
                    new Date(taskStartDate)
                );
                break;

            default:
                break;
        }
        return res;
    }
}
