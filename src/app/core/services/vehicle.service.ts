import { Injectable } from '@angular/core';
import {Vehicle} from '@models/vehicle';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {VehicleFilterOptions} from '../interfaces/vehicle-filter';
import {environment} from '@environments/environment.development';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = `${environment.apiUrl}`;
  private vehiclesSubject = new BehaviorSubject<Vehicle[]>([]);
  filteredVehicles$ = this.vehiclesSubject.asObservable();

  constructor(private http: HttpClient) {}

  filterVehicles(filters: VehicleFilterOptions): Observable<Vehicle[]> {
    let params = new HttpParams();
    if (filters.type !== null && filters.type !== undefined) {
      params = params.set('vehicleType', filters.type.toString());
    }

    return this.http.get<Vehicle[]>(`${this.apiUrl}/vehicle/brand`, { params }).pipe(
      map((vehicles: Vehicle[]) => {
        console.log('Veículos recebidos do servidor:', vehicles);
        this.vehiclesSubject.next(vehicles);
        return vehicles;
      })
    );
  }

  getVehicleById(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/vehicle/${id}`);
  }
}
