import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private userNotifications: string[] = [];
  private notificationsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {
  }

  createNotification(vehicleId: string): void {
    console.log('TODO: send POST request to the backend to create new notification, vehicleId: ', vehicleId)
    this.userNotifications = [...this.userNotifications, vehicleId];
    this.notificationsSubject.next(this.userNotifications);
  }

  getNotificationsObservable(): Observable<string[]> {
    return this.notificationsSubject.asObservable();
  }
}
