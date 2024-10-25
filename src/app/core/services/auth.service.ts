import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '@domain/user/login';
import { Register } from '@domain/user/register';
import { RegisterResponse } from '@domain/user/registerResponse';
import { Token } from '@domain/user/token';
import { environment } from '@environments/environment.development';
import {BehaviorSubject, catchError, map, Observable} from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasLocalToken());
  private entrypoint = `${environment.entrypoint}/auth`;

  constructor(private http: HttpClient) {}

  public login(data: Login): Observable<Token> {
    return this.http.post<Token>(`${this.entrypoint}/login`, data, { observe: 'response' }).pipe(
      map((response: HttpResponse<Token>) => {
        localStorage.setItem('token', response.body!.token)
        this.loggedInSubject.next(true);
        return response.body!;
      }),
    );
  }

  public register(data: Register): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.entrypoint}/register`, data, { observe: 'response' }).pipe(
        map((response: HttpResponse<RegisterResponse>) => response.body!),
        catchError(this.handleError)
    );
  }

  public validateToken(token: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.entrypoint}/token`, token, { observe: 'response' }).pipe(
      map((response: HttpResponse<boolean>) => {
        this.loggedInSubject.next(response.body!)
        return response.body!;
      }),
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

  public isTokenExpired(token: string | null): boolean {
    if (!token) return true;

    const expirationDate = this.getTokenExpirationDate(token);
    return expirationDate ? expirationDate < new Date() : false;
  }

  private getTokenExpirationDate(token: string): Date | null {

    const decodedToken = jwtDecode(token);

    if (decodedToken.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decodedToken.exp);

    return date;
  }
}
