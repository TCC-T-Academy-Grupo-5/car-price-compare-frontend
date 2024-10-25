import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '@domain/user/login';
import { Register } from '@domain/user/register';
import { RegisterResponse } from '@domain/user/registerResponse';
import { Token } from '@domain/user/token';
import { UserProfile } from '@domain/user/userProfile';
import { environment } from '@environments/environment.development';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  public login(data: Login): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/login`, data, { observe: 'response' }).pipe(
      map((response: HttpResponse<Token>) => response.body!),
      catchError(this.handleError)
    );
  }

  public register(data: Register): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, data, { observe: 'response' }).pipe(
        map((response: HttpResponse<RegisterResponse>) => response.body!),
        catchError(this.handleError)
    );
  }

  public validateToken(token: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/token`, token, { observe: 'response' }).pipe(
      map((response: HttpResponse<boolean>) => response.body!),
      catchError(this.handleError)
    );
  }

  getUserInfo(): Observable<UserProfile> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<UserProfile>(`${this.apiUrl}/profile`, { headers });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return new Observable<never>((observer) => {
      observer.error(error);
    });
  }

}
