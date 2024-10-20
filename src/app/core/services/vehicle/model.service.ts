import { Injectable } from '@angular/core';
import {AbstractService} from '@services/vehicle/abstract.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Model} from '@domain/vehicle/model';

@Injectable({
  providedIn: 'root'
})
export class ModelService extends AbstractService<Model[], { vehicleType: number, brand: string, page: number, pageSize: number }> {

  constructor(protected override http: HttpClient) {
    super(http);
  }

  protected apiEndpoint(): string {
    return 'model';
  }

  public findByBrand(filters: { vehicleType: number, brand: string, page: number, pageSize: number }): Observable<Model[]> {
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
}
