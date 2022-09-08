import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RulesServicesService {
  userMonitorUrl = environment.userMonitorUrl;
  constructor(private http: HttpClient) { }
  
  getRulesetMetrics(id: string): Observable<any>{
    let params = new HttpParams()
                     .set('id', id);
    return this.http.get<any>(this.userMonitorUrl + '/api/RuleSetCalculation/' + id);
  }
  
}

