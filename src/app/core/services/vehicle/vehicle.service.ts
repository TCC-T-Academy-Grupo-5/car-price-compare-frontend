import { Injectable } from '@angular/core';
import {Vehicle} from '@domain/vehicle/vehicle';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AbstractService} from '@services/vehicle/abstract.service';
import {VehicleFilters} from '@domain/vehicle/vehicle-filters';
import {Model} from '@domain/vehicle/model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends AbstractService<Vehicle[], VehicleFilters> {

  constructor(protected override http: HttpClient) {
    super(http);
  }

  protected endpoint(): string {
    return 'vehicle';
  }

  findVehicles(filters: VehicleFilters): Observable<{ vehicles: Vehicle[], model: Model }> {
    return new Observable<{ vehicles: Vehicle[], model: Model }>((observer) => {
      this.filter(filters).subscribe({
        next: (response: HttpResponse<Vehicle[]>) => {
          const vehicles = response.body ? response.body : [];

          const model: Model = {
            name: filters.model || '',
            imageUrl: '',
          };

          observer.next({ vehicles, model });
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }
}
