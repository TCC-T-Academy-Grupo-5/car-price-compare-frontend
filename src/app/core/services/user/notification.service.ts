import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, of} from 'rxjs';
import {map} from "rxjs/operators";
import {NotificationRequest} from '@domain/vehicle/notification-request';
import {environment} from "@environments/environment";
import {NotificationResponse} from "@domain/vehicle/notification-response";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/user/notifications`;
  private notificationsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {
  }

  createNotification(notificationRequest: NotificationRequest): Observable<NotificationResponse> {
    return this.http.post<NotificationResponse>(this.apiUrl, notificationRequest);
  }

  getNotificationsObservable(): Observable<string[]> {
    return this.notificationsSubject.asObservable();
  }

  isUserSubscribedToVehicle(vehicleId: string): Observable<boolean> {
    return this.notificationsSubject.pipe(
        map((notifications: string[]) => notifications.includes(vehicleId))
    );
  }
}
