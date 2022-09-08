import { Component, OnInit } from "@angular/core";

export interface TimelineItem {
    label?: string;
    icon?: string;
    url?: string;
    routerLink?: any;
    expanded?: boolean;
    disabled?: boolean;
    visible?: boolean;
    active?: boolean;
    style?: any;
    color?: string;
    content?: string;
    styleClass?: string;
    title?: string;
    id?: string;
}
@Component({
    selector: "app-leave-time-line",
    templateUrl: "./leave-time-line.component.html",
    styleUrls: ["./leave-time-line.component.scss"],
})
export class LeaveTimeLineComponent implements OnInit {
    list: TimelineItem[] = [];
    externalVariable = "hello";
    constructor() {}

    ngOnInit(): void {
        // const self = this;

        this.list.push({
            label: "Action",
            icon: "fa fa-calendar-plus-o",
            styleClass: "teste",
            content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
            title: "Jul 15, 2021",
        });

        this.list.push({
            label: "Action",
            icon: "fa fa-plus",
            styleClass: "teste",
            content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
            title: "Jul 15, 2021",
        });
    }
}
