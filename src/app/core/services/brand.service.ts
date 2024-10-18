import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Brand} from '@models/brand';
import {environment} from '@environments/environment.development';
import {BrandFilterOptions} from '../interfaces/brand-filter';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  public filterBrands(filters: BrandFilterOptions): Observable<Brand[]> {
    const params = this.paramsFromFilter(filters);
    console.log("params: ", params);
    return this.http.get<Brand[]>(`${this.apiUrl}/vehicle/brand`, { params });
  }

  private paramsFromFilter(filters: BrandFilterOptions): HttpParams {
    let params = new HttpParams();
    params = params.set('pageNumber', filters.pageNumber?.toString() || '');
    params = params.set('pageSize', filters.pageSize?.toString() || '');
    params = params.set('name', filters.name?.toString() || '');
    params = params.set('vehicleType', filters.vehicleType?.toString() || '');
    return params;
  }
}
