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
  
  public getFavoriteByVehicleId(vehicleId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<any>(`${this.apiUrl}/favorites/vehicle/${vehicleId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  public addFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.post<any>(`${this.apiUrl}/favorites`, {vehicleId: id}, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  public removeFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.delete<any>(`${this.apiUrl}/favorites/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );

  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return new Observable<never>((observer) => {
      observer.error(error);
    });
  }
}
