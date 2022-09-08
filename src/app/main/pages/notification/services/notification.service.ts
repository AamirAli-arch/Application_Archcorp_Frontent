import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationRequest } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  baseUrl = environment.apiUrl;
  readNotification = new BehaviorSubject('');
  getnotificationcount = this.readNotification.asObservable();
  constructor(private http: HttpClient) { }

  updateCount(id) {
    return this.readNotification.next(id)
  }

  getNotification(request: NotificationRequest):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/Notification/UserAllNotifications', request);
  }

  getNotificationTrayList():Observable<any>{
    return this.http.get<any>(this.baseUrl + '/api/Notification/UserNotifications');
  }

  markNotificationViewed(request: NotificationRequest):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/Notification/MarkNotificationViewed', request);
  }


}

