import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService<T, F extends Record<string, unknown>> {
  protected apiUrl: string;

  protected constructor(protected http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/vehicle`;
  }

  public filter(filters: F): Observable<HttpResponse<T>> {
    const params = this.paramsFromFilter(filters);
    return this.http.get<T>(`${this.apiUrl}/${this.apiEndpoint()}`, {
      params,
      observe: 'response'
    });
  }

  protected paramsFromFilter(filters: F): HttpParams {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      const value = filters[key];
      if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });
    return params;
  }

  protected abstract apiEndpoint(): string;
}
