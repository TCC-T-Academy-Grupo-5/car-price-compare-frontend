import { Injectable } from '@angular/core';
import {Vehicle} from '@domain/vehicle/vehicle';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AbstractService} from '@services/vehicle/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends AbstractService<Vehicle[], { model: string, page: number, pageSize: number }> {

  constructor(protected override http: HttpClient) {
    super(http);
  }

  protected apiEndpoint(): string {
    return 'model';
  }

  public findByModel(filters: { vehicleType: number, model: string, page: number, pageSize: number }): Observable<Vehicle[]> {
    return new Observable<Vehicle[]>((observer) => {
      this.filter(filters).subscribe({
        next: (response: HttpResponse<Vehicle[]>) => {
          observer.next(response.body!);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        }
      });
    });
  }

}
