import {Injectable} from '@angular/core';
import {Vehicle} from '@domain/vehicle/vehicle';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {AbstractService} from '@services/vehicle/abstract.service';
import {VehicleFilters} from '@domain/vehicle/vehicle-filters';
import {HeadersService} from '@services/headers.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends AbstractService<Vehicle[], VehicleFilters> {
  constructor(
    protected override http: HttpClient,
    private headersService: HeadersService
  ) {
    super(http);
  }

  protected endpoint(): string {
    return 'vehicle';
  }

  findVehicles(filters: VehicleFilters): Observable<{ vehicles: Vehicle[] }> {
    const params = this.createHttpParams(filters);
    return this.http.get<Vehicle[]>(`${this.entrypoint}/${this.endpoint()}`, { params, observe: 'response' }).pipe(
      map((response: HttpResponse<Vehicle[]>) => {
        console.log('Response Headers:', response.headers.keys().map(key => ({ [key]: response.headers.get(key) })));

        const headers = response.headers;
        this.headersService.setHeaders(headers);

        return {
          vehicles: response.body || []
        };
      })
    );
  }

  private createHttpParams(filters: VehicleFilters): HttpParams {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params = params.set(key, value.toString());
      }
    });

    return params;
  }
}
