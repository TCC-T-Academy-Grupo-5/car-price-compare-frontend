import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = `${environment.entrypoint}/user`;

  constructor(private http: HttpClient) {}

  public getFavoriteByVehicleId(vehicleId: string): Observable<never> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<never>(`${this.apiUrl}/favorites/vehicle/${vehicleId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  public addFavorite(id: string): Observable<never> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<never>(`${this.apiUrl}/favorites`, {vehicleId: id}, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  public removeFavorite(id: string): Observable<never> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<never>(`${this.apiUrl}/favorites/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );

  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return new Observable<never>((observer) => {
      observer.error(error);
    });
  }
}
