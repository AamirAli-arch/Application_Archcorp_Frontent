import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImgSrcStyleBuilder } from '@angular/flex-layout';

import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import {AddsystemRequest, SystemRequest, SystemResponse } from '../model/system';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    projectWithSystem(request):Observable<SystemResponse>{
        return this.http.get<SystemResponse>(this.baseUrl + '/api/ProjectSystem/ProjectWithSystem?projectId='+request);
    }

    downLoadFile(request):any{
        return this.http.get(this.baseUrl + '/api/ProjectSystem/Download?systemId='+request, {responseType: 'blob', headers: new HttpHeaders().append('Content-Type','application/json')});
    }

    addSystem(request):Observable<SystemResponse>{
        return this.http.post<SystemResponse>(this.baseUrl + '/api/ProjectSystem/AddSystem', request );
    }

    getDeciplineList():Observable<SystemResponse>{
        return this.http.get<SystemResponse>(this.baseUrl + '/api/Discipline/GetAll');
    }
    getSystemList(deciplineId:SystemRequest):Observable<SystemResponse>{
        return this.http.get<SystemResponse>(this.baseUrl + '/api/System/SystemByDisciplineId?disciplineId='+deciplineId.id);
    }
    getSubSystemList(deciplineId:SystemRequest):Observable<SystemResponse>{
        return this.http.get<SystemResponse>(this.baseUrl + '/api/SubSystem/SubSystemBySystemId?systemId='+deciplineId.id);
    }
}
