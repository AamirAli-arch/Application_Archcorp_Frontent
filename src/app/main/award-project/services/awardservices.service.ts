import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { AddScopeRequest, AwardContractRequest, AwardProjectRequest, AwardProjectResponse, AwardResponse, CommentRequest, ViewRequest } from "../modal/award-modal";

@Injectable({
    providedIn: "root",
})
export class AwardservicesService {
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    getMasterProjectScope(): Observable<AwardProjectResponse> {
        return this.http.get<AwardProjectResponse>(this.baseUrl +"/api/Project/MasterScope");
    }

    getProjectDetails(projectId): Observable<AwardProjectResponse> {
        return this.http.get<AwardProjectResponse>(this.baseUrl +"/api/Project/Detail?id="+projectId);
    }

    getMasterDeveloper(): Observable<any> {
        return this.http.get<any>(this.baseUrl +"/api/MasterDeveloper");
    }

    getAuthorityList(): Observable<AwardProjectResponse> {
        return this.http.get<AwardProjectResponse>(this.baseUrl +"/api/Authority");
    }

    addDetails(request:AwardProjectRequest):Observable<AwardProjectResponse>{
        return this.http.post<AwardProjectResponse>(this.baseUrl +"/api​/Project​/AddDetail",request);
    }

    addContract(request:AwardContractRequest):Observable<AwardProjectResponse>{
        return this.http.post<AwardProjectResponse>(this.baseUrl +"/api/ContractTerm/Add",request);
    }

    updateProjectScope(request:AwardContractRequest):Observable<AwardResponse>{
        return this.http.post<AwardResponse>(this.baseUrl +"/api/Project/UpdateProjectScope",request);
    }

    addMoreProjectScope(request:AddScopeRequest):Observable<AwardProjectResponse>{
        return this.http.post<AwardProjectResponse>(this.baseUrl +"/api/Project/AddScope",request);
    }

    commentProjectScope(request:CommentRequest):Observable<AwardResponse>{
        return this.http.post<AwardResponse>(this.baseUrl +"/api/Project/AddScopeNote",request);
    }

    viewProjectScope(request:ViewRequest):Observable<AwardResponse>{
        return this.http.post<AwardResponse>(this.baseUrl +"/api/Project/GetProjectScopeNote",request);
    }

}
