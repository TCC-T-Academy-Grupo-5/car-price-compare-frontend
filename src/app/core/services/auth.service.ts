import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '@domain/user/login';
import { Register } from '@domain/user/register';
import { RegisterResponse } from '@domain/user/registerResponse';
import { Token } from '@domain/user/token';
import { environment } from '@environments/environment.development';
import {BehaviorSubject, catchError, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasLocalToken());

  constructor(private http: HttpClient) {}

  public login(data: Login): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/login`, data, { observe: 'response' }).pipe(
      map((response: HttpResponse<Token>) => {
        localStorage.setItem('token', response.body!.token)
        this.loggedInSubject.next(true);
        return response.body!;
      }),
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

  public logout(): void {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false);
  }

  private hasLocalToken(): boolean {
    return !!localStorage.getItem('token');
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return new Observable<never>((observer) => {
      observer.error(error);
    });
  }

}
