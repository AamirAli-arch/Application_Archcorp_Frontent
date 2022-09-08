import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateProject, ProjectView, TaskRequest ,TaskRequestDelete} from '../models/projectrequest';


@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    createProject(request: CreateProject): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/Project/Create', request);
    }
    updateProject(request: CreateProject): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/Project/Update', request);
    }
    createProjectTask(request: TaskRequest): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/Task/Create', request);
    }
    updateProjectTask(request: TaskRequest): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/Task/Update', request);
    }
    deleteProjectTask(request: TaskRequestDelete): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/Task/Delete', request);
    }
    getSingleProjectResponse(request: ProjectView): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/Project/SingleProject?projectId=' + request.id);
    }

    getProjectDeatils(request): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/api/Project/Project?id=' + request);
    }

}
