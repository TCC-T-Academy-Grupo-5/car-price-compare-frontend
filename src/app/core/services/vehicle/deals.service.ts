import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Deal} from '@domain/vehicle/deal';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  constructor(private http: HttpClient) { }

  getVehicleDeals(vehicleId: string): Observable<Deal[]> {
    return this.http.get<Deal[]>(`${environment.apiUrl}/vehicle/${vehicleId}/deals`);
  }
}
