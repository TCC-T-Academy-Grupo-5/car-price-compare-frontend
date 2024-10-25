import { Injectable } from '@angular/core';
import {environment} from '@environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VehicleDetails} from '@domain/vehicle/vehicledetails';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleDetailsService {
  private entrypoint = `${environment.entrypoint}`;

  constructor(private http: HttpClient) {}

  getVehicleById(id: string): Observable<VehicleDetails> {
    return this.http.get<VehicleDetails>(`${this.entrypoint}/vehicle/${id}`).pipe(
      map((vehicleDetails: VehicleDetails) => {
        const fipePrices = vehicleDetails.fipePrices;

        vehicleDetails.fipePrices = vehicleDetails.fipePrices.map((price, index) => {
          if (index === fipePrices.length -1) {
            return { ...price, prevMonthDiff: 0, prevMonthDiffPercentage: 0 }
          }

          const prevMonthPrice = fipePrices[index + 1].price;
          const prevMonthDiff = price.price - prevMonthPrice;
          const prevMonthDiffPercentage = (prevMonthDiff / prevMonthPrice) * 100;
          return { ...price, prevMonthDiff, prevMonthDiffPercentage }
        });

        return vehicleDetails;
      })
    );
  }
}
