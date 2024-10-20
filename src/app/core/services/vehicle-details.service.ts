import { Injectable } from '@angular/core';
import {environment} from '@environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VehicleDetails} from '@domain/vehicle/vehicledetails';

@Injectable({
  providedIn: 'root'
})
export class VehicleDetailsService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getVehicleById(id: string): Observable<VehicleDetails> {
    return this.http.get<VehicleDetails>(`${this.apiUrl}/vehicle/${id}`);
  }
}
