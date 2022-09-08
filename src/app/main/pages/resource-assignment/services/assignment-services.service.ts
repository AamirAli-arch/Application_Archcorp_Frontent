import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskRequest } from '../models/resource-assignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentServices {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  setTaskAssignment(request: TaskRequest): Observable<any>{
    return this.http.post(this.baseUrl + '/api/Task/MultiProjectTaskAndResourceAssignment', { name: request.name, employeeId: request.employeeId, startDate: request.startDate, endDate: request.endDate, verb: request.verb, duration: request.duration, projectIds: request.projectIds, progress: 0  })
  }
}
