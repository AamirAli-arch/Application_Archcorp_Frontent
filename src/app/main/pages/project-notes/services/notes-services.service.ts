import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { CreateNoteRequest, CreateNoteResponse, GetBriefRequest, GetNoteRequest, GetNoteResponse } from './riskNotes';
import { CreateProjectLevelRequest,CreateProjectLevelResponse } from './projectLevels';
import { GetProjectBriefingRequest,GetProjectBriefingResponse } from './projectBriefing';
import { GetProjectLevelCommentsRequest,GetProjectLevelCommentsResponse } from './projectLevels';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class NotesServicesService {
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  addNote(request: CreateNoteRequest) : Observable<CreateNoteResponse>{
    return this.http.post<CreateNoteResponse>(this.baseUrl +"/api/RiskNotes/AddRiskNotes",request);
  }

  getNotes(request: GetNoteRequest) : Observable<CreateNoteResponse>{
    return this.http.post<CreateNoteResponse>(this.baseUrl +"/api/RiskNotes/GetNotesByProjectId", request);
  }

  createLevel(request:CreateProjectLevelRequest):Observable<CreateProjectLevelResponse>{
    return this.http.post<CreateProjectLevelResponse>(this.baseUrl +"/api/ProjectLevels/CreateProjectLevels",request);
  }

  getProjectBriefing(request: GetBriefRequest):Observable<GetProjectBriefingResponse>{
    return this.http.post<GetProjectBriefingResponse>(this.baseUrl + "/api/ProjectBrief/GetProjectBriefByProjectId", request);
    
  }

  getProjectLevelComments(request:GetProjectLevelCommentsRequest):Observable<GetProjectLevelCommentsResponse>{
    return this.http.post<GetProjectLevelCommentsResponse>(this.baseUrl +"/api/ProjectLevels/GetProjectLevelComments",request);
  };

  getAllNotes(request: GetNoteRequest) : Observable<GetNoteResponse>{
    return this.http.post<GetNoteResponse>(this.baseUrl +"/api/RiskNotes/GetAllRiskNotes", request);
  }

}
