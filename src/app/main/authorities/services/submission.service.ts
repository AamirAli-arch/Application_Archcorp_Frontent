import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AddStage, ProjectWithSubmissionPlan, SubmissionCardPlan, SubmissionPlan, SubmissionProjectResponse, SubmissionResponse } from './modal/submission';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    getStageList(): Observable<SubmissionResponse> {
        return this.http.get<SubmissionResponse>(this.baseUrl +"/api/Stage");
    }

    getAuthorityList(): Observable<SubmissionResponse> {
        return this.http.get<SubmissionResponse>(this.baseUrl +"/api/Authority");
    }

    getMasterList(id:number): Observable<SubmissionResponse> {
        return this.http.get<SubmissionResponse>(this.baseUrl +"/api/MasterDeveloper?emirate="+id);
    }

    addSubmission(request:SubmissionPlan): Observable<SubmissionResponse>{
        return this.http.post<SubmissionResponse>(this.baseUrl +"/api/Submission/Plan",request);
    }

    getSubmissionProjectList(request:SubmissionCardPlan): Observable<SubmissionProjectResponse> {
        return this.http.post<SubmissionProjectResponse>(this.baseUrl +"/api/Submission/Projects", request);
    }

    getProjectList(request:ProjectWithSubmissionPlan): Observable<SubmissionResponse> {
        return this.http.post<SubmissionResponse>(this.baseUrl +"/api/Submission/ProjectWithSubmissions", request);
    }

    submissionDetails(submissionId:number): Observable<SubmissionResponse> {
        return this.http.get<SubmissionResponse>(this.baseUrl +"/api/Submission/SubmissionTimeline?submissionId="+submissionId);
    }

    addStage(request:AddStage): Observable<SubmissionResponse> {
        return this.http.post<SubmissionResponse>(this.baseUrl +"/api/Submission/AddStage",request);
    }
}
