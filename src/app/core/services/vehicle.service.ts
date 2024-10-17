import { Injectable } from '@angular/core';
import {Vehicle} from '@models/vehicle';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {VehicleFilterOptions} from '../interfaces/vehicle-filter';
import {environment} from '@environments/environment.development';
import {map} from 'rxjs/operators';
import {BrandFilterOptions} from '../interfaces/brand-filter';
import {Brand} from '@models/brand';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private apiUrl = `${environment.apiUrl}`;
  private vehiclesSubject = new BehaviorSubject<Brand[]>([]);
  filteredVehicles$ = this.vehiclesSubject.asObservable();

  constructor(private http: HttpClient) {}

  filterBrands(filters: BrandFilterOptions): Observable<Brand[]> {
    let params = new HttpParams();
    if (filters.type !== null && filters.type !== undefined) {
      params = params.set('vehicleType', filters.type.toString());
    }

    return this.http.get<Brand[]>(`${this.apiUrl}/vehicle/brand`, { params }).pipe(
      map((brands: Brand[]) => {
        this.vehiclesSubject.next(brands);
        return brands;
      })
    );
  }
}
