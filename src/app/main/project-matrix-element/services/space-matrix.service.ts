import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, Observer } from 'rxjs';
import { AddSpaceMatrixElementRequest, SpaceMatrixElementResponse,AddSpaceMatrixElementResponse } from './matrix';

@Injectable({
  providedIn: 'root'
})
export class SpaceMatrixService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getAllSpaceMatrixElements() :Observable<SpaceMatrixElementResponse>{
    return  this.http.get<any>(this.baseUrl +"/api/SpaceMatrixElement/GetAllSpaceMatrixElements");          
  }

  addSpaceMatrixElement(request : AddSpaceMatrixElementRequest ):Observable<AddSpaceMatrixElementResponse> {
    return this.http.post<any>(this.baseUrl + "/api/SpaceMatrixElement/AddSpaceMatrixElement", request);
  }
}
