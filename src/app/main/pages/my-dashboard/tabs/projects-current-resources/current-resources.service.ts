import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Console } from 'console';
import { GetCurrentResourcesResponse } from './resources';  

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class CurrentResourcesService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }    

  getProjectsCurrentResources() :Observable<GetCurrentResourcesResponse>{
    return  this.http.get<any>(this.baseUrl +"/api/Project/GetProjectsCurrentResources");          
  }
}


