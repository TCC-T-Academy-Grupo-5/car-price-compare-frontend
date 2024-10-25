import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Deal} from '@domain/vehicle/deal';
import {environment} from '@environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DealsService {
  private dealImageDefaultResolution = '0225x0200'

  constructor(private http: HttpClient) { }

  getVehicleDeals(vehicleId: string): Observable<Deal[]> {
    return this.http.get<Deal[]>(`${environment.entrypoint}/vehicle/${vehicleId}/deals`).pipe(
      map((deals: Deal[]) => deals.map(deal => {
        if (deal.store === 'Chaves Na Mão') {
          deal.imageUrl = deal.imageUrl.replace(/\d{4}x\d{4}|\d{3}x\d{3}/, this.dealImageDefaultResolution)
        }

        return deal;
      }))
    );
  }
}
