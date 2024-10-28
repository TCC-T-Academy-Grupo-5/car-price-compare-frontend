import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {NotificationRequest} from '@domain/vehicle/notification-request';
import {environment} from "@environments/environment";
import {NotificationResponse} from "@domain/vehicle/notification-response";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private apiUrl = `${environment.entrypoint}/user/notifications`;
    private notificationsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    constructor(private http: HttpClient) {
    }

    getNotification(): Observable<NotificationResponse[]> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
        return this.http.get<NotificationResponse[]>(this.apiUrl,  { headers } );
    }

    createNotification(notificationRequest: NotificationRequest): Observable<NotificationResponse> {
        return this.http.post<NotificationResponse>(this.apiUrl, notificationRequest);
    }

    deleteNotification(notificationId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${notificationId}`);
    }

    isUserSubscribedToVehicle(vehicleId: string): Observable<{ exists: boolean, notificationId?: string }> {
        return this.http.get<{
            exists: boolean,
            notificationId?: string
        }>(`${this.apiUrl}/existsPendingByVehicleId/${vehicleId}`);
    }
}
