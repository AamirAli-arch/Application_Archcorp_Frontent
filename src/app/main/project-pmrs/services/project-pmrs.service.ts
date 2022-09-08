import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, Observer } from 'rxjs';
import { SystemResponse } from 'app/main/pages/system/model/system';

@Injectable({
  providedIn: 'root'
})
export class ProjectPmrsService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getDeciplineList():Observable<SystemResponse>{
    return this.http.get<SystemResponse>(this.baseUrl + '/api/Discipline/GetAll');
}
}
