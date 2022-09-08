import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AllocationProjectWise, ResourceRequest } from '../models/resource-request';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }


  getSiteResourceList(request: ResourceRequest):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/SiteResourceAllocation/SiteResourceAllocations', request);
  }

  getProjectList():Observable<any>{
      return this.http.get<any>(this.baseUrl + '/api/Project/ProjectsForReport');
  }
  addResource(request: ResourceRequest):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/SiteResourceAllocation/Add', request);
  }
  deleteResource(request: ResourceRequest):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/SiteResourceAllocation/Delete', request);
  }

  projectResourceList(request: AllocationProjectWise):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/SiteResourceAllocation/GetSiteResourceAllocationProjectWiseWeek', request);
  }
  projectResourceListMonthWiase(request: AllocationProjectWise):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/SiteResourceAllocation/GetSiteResourceAllocationProjectWiseMonth', request);
  }
  resourceListMonthWiase(request: AllocationProjectWise):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/SiteResourceAllocation/GetSiteResourceAllocationResourceWiseMonth', request);
  }
  resourceListWeekWiase(request: AllocationProjectWise):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/SiteResourceAllocation/GetSiteResourceAllocationResourceWiseWeek', request);
  }

}
