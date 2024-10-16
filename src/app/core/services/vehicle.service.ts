import { Injectable } from '@angular/core';
import {Vehicle} from '@models/vehicle';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {VehicleFilterOptions} from '../interfaces/vehicle-filter';
import {environment} from '@environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = `${environment.apiUrl}/vehicles`;
  private vehicles: Vehicle[] = [];

  private filteredVehiclesSubject = new BehaviorSubject<Vehicle[]>(this.vehicles);
  filteredVehicles$ = this.filteredVehiclesSubject.asObservable();

  constructor(private http: HttpClient) {}

  filterVehicles(filters: VehicleFilterOptions): void {
    let params = new HttpParams();

    if (filters.make) {
      params = params.set('make', filters.make);
    }

    if (filters.model) {
      params = params.set('model', filters.model);
    }

    if (filters.year) {
      params = params.set('year', filters.year);
    }

    if (filters.priceRange) {
      params = params.set('price_min', filters.priceRange[0]).set('price_max', filters.priceRange[1]);
    }

    this.http.get<Vehicle[]>(this.apiUrl, { params }).subscribe(
      (vehicles) => {
        this.filteredVehiclesSubject.next(vehicles);
      },
      (error) => {
        console.error('Erro ao buscar veículos:', error);
      }
    );
  }
}
