import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApartmentRequest, FreshAirRequest, FreshAirResponse } from '../modal/technical-card';

@Injectable({
  providedIn: 'root'
})
export class TechnicalCardsService {
    baseUrl = environment.apiUrl;
  userMonitorUrl = environment.userMonitorUrl;

  constructor(private http: HttpClient) { }

getLevalList():Observable<FreshAirResponse>{
    return this.http.get<FreshAirResponse>(this.baseUrl + '/api/Level');
}

getSpaceList(id:number):Observable<FreshAirResponse>{
    return this.http.get<FreshAirResponse>(this.baseUrl + '/api/Parameter?parameterType='+id);
}


getParamterValue(request:FreshAirRequest):Observable<FreshAirResponse>{
    return this.http.post<FreshAirResponse>(this.baseUrl + '/api/Parameter/Spaces',request);
}

addParamterValue(request:FreshAirRequest):Observable<FreshAirResponse>{
    return this.http.post<FreshAirResponse>(this.baseUrl + '/api/Parameter/AddSpace',request);
}

updateParamterValue(request:FreshAirRequest):Observable<FreshAirResponse>{
    return this.http.post<FreshAirResponse>(this.baseUrl + '/api/Parameter/Update',request);
}

addEquipmentValue(request:FreshAirRequest):Observable<FreshAirResponse>{
    return this.http.post<FreshAirResponse>(this.baseUrl + '/api/Parameter/AddEquipment',request);
}

getEquipmentValue(request:FreshAirRequest):Observable<FreshAirResponse>{
    return this.http.post<FreshAirResponse>(this.baseUrl + '/api/Parameter/Equipments',request);
}

getloadType(request:FreshAirRequest):Observable<FreshAirResponse>{
    return this.http.post<FreshAirResponse>(this.baseUrl + '/api/Parameter/Elements',request);
}

addApartment(request:ApartmentRequest):Observable<FreshAirResponse>{
    return this.http.post<FreshAirResponse>(this.baseUrl + '/api/Parameter/AddAppartmentElement',request);
}

apartmentList(request:ApartmentRequest):Observable<FreshAirResponse>{
    return this.http.post<FreshAirResponse>(this.baseUrl + '/api/Parameter/Appartments',request);
}

apartmentUpdate(request:ApartmentRequest):Observable<FreshAirResponse>{
    return this.http.post<FreshAirResponse>(this.baseUrl + '/api/Parameter/UpdateElement',request);
}

}
