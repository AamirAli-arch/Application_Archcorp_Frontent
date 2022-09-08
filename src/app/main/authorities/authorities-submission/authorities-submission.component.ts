import { AfterViewInit, Component, OnInit } from "@angular/core";
import { SubmissionService } from "../services/submission.service";
import { filter } from "rxjs/operators";
import { LoaderSpinerService } from "app/main/pages/loader-spiner/loader-spiner.service";
import { SubmissionCardPlan } from "../services/modal/submission";
import { project } from "./../../pages/project-dropdown/project-dropdown.component";

@Component({
    selector: "app-authorities-submission",
    templateUrl: "./authorities-submission.component.html",
    styleUrls: ["./authorities-submission.component.scss"],
})
export class AuthoritiesSubmissionComponent implements OnInit {
    submissionArray: any = [];
    plannedCount: any = 0;
    submitCount: any = 0;
    getprojectId: any = [];
    constructor(
        private _service: SubmissionService,
        private _loaderService: LoaderSpinerService
    ) {}

    ngOnInit(): void {
        this.getProjectCardList();
    }

    countSubmissions(projId, value) {
        return this.submissionArray
            .find((element) => element.id === projId)
            .submissions.filter(function (elem) {
                return value === elem.currentStatus;
            }).length;
    }
    getProjectCardList() {
        //this._loaderService.show();
        let request = new SubmissionCardPlan();
        request.projectIds = this.getprojectId;
        this._service.getSubmissionProjectList(request).subscribe(
            (response: any) => {
                if (response) {
                    this._loaderService.hide();
                    this.submissionArray = response.submissions;
                }
            },
            (error) => {
                console.log("error", error);
            }
        );
    }

    projectId(id) {
        this.getprojectId = id;
        this.getProjectCardList();
    }
}
