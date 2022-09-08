import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";

import { BuildinFloors } from "../models/buildingfloor";

@Injectable({
    providedIn: "root",
})
export class FloorService {
    baseUrl = environment.apiUrl;
    userMonitorUrl = environment.userMonitorUrl;
    messageSource = new BehaviorSubject(0);
    currentMessage = this.messageSource.asObservable();
    constructor(private http: HttpClient) {}

    changeTabs(message:any){
        if(message){
          this.messageSource.next(message)
        }
      
      }
    getLevelDetail(id: number): Observable<any> {
        return this.http.get<any>(this.userMonitorUrl + "/api/Elements/" + id);
    }

    getProjectList(): Observable<any> {
        return this.http.get<any>(this.baseUrl + "/api/Project/Projects");
    }

    getWallsData(pojectCode): Observable<any>{
        return this.http.get<Observable<any>>(this.userMonitorUrl + '/api/calculation/BuildingWalls/'+pojectCode);
    }

}
