import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService<T, F> {
  protected entrypoint: string;

  protected constructor(protected http: HttpClient) {
    this.entrypoint = `${environment.entrypoint}`;
  }

  public filter(filters: F): Observable<HttpResponse<T>> {
    const params = this.paramsFromFilter(filters);
    return this.http.get<T>(`${this.entrypoint}/${this.endpoint()}`, {
      params,
      observe: 'response'
    });
  }

  protected paramsFromFilter(filters: F): HttpParams {
    let params = new HttpParams();
    Object.keys(filters as Record<string, unknown>).forEach(key => {
      const value = (filters as Record<string, unknown>)[key];
      if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });
    return params;
  }

  protected abstract endpoint(): string;
}
