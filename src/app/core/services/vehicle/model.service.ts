import { Injectable } from '@angular/core';
import {AbstractService} from '@services/vehicle/abstract.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Model} from '@domain/vehicle/model';
import {VehicleFilters} from '@domain/vehicle/vehicle-filters';

@Injectable({
  providedIn: 'root'
})
export class ModelService extends AbstractService<Model[], VehicleFilters> {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  protected apiEndpoint(): string {
    return 'vehicle/model';
  }

  public findByBrand(filters: VehicleFilters): Observable<Model[]> {
    return new Observable<Model[]>((observer) => {
      this.filter(filters).subscribe({
        next: (response: HttpResponse<Model[]>) => {
          observer.next(response.body!);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        }
      });
    });
  }

  public getByModel(model: string): Observable<Model[]> {
    return new Observable<Model[]>((observer) => {
      this.http.get<Model[]>(`${this.apiUrl}/${this.apiEndpoint()}?name=${model}`, { observe: 'response' }).subscribe({
        next: (response: HttpResponse<Model[]>) => {
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
