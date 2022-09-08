import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { TimeOffRequest } from "../modal/timeOffTeams";

@Injectable({
    providedIn: "root",
})
export class TimeoffEmailService {
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    getEmployTimeOff(timeOffId): Observable<any> {
        return this.http.get(
            this.baseUrl +
                "/api/Leave/GetEmplyoyeeTimeOff?timeOffId=" +
                timeOffId
        );
    }
    applyTimeOff(request: TimeOffRequest): Observable<any> {
        return this.http.post<TimeOffRequest>(
            this.baseUrl + "/api/Leave/ApproveTimeOffFromTeams",
            request
        );
    }

    rejectTimeOff(request: TimeOffRequest): Observable<any> {
        return this.http.post<TimeOffRequest>(
            this.baseUrl + "/api/Leave/RejectTimeOffFromTeams",
            request
        );
    }
}
