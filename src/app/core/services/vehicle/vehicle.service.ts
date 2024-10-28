import { Injectable } from '@angular/core';
import {Vehicle} from '@domain/vehicle/vehicle';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AbstractService} from '@services/vehicle/abstract.service';
import {VehicleFilters} from '@domain/vehicle/vehicle-filters';
import {SelectOption} from '@domain/vehicle/select-option';

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

  public findVehicles(filters: VehicleFilters): Observable<Vehicle[]> {
    return new Observable<Vehicle[]>((observer) => {
      this.filter(filters).subscribe({
        next: (response: HttpResponse<Vehicle[]>) => {
          observer.next(response.body ? response.body : []);
          observer.complete();
        }, error: (err) => observer.error(err)
      });
    });
  }

  public findVehicleOptionsByYearId(yearId: string): Observable<SelectOption[]> {
    return this.http.get<SelectOption[]>(`${this.entrypoint}/vehicle/year/${yearId}/options`);
  }
}
