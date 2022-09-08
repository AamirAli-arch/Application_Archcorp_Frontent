import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { TimeLineRequest, TimeLineResponse } from '../model/timeline';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

    baseUrl = environment.apiUrl;
    userMonitorUrl = environment.userMonitorUrl;
    constructor(private http: HttpClient) { }

  getEmployeeTimeLine(request : TimeLineRequest) : Observable<any>{
    return this.http.post<TimeLineResponse>(this.baseUrl + '/api/TaskTimeSheet/EmployeeTimeline', request);
  }
}
