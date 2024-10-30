import { Injectable } from '@angular/core';
import {AbstractService} from '@services/vehicle/abstract.service';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Model} from '@domain/vehicle/model';
import {VehicleFilters} from '@domain/vehicle/vehicle-filters';
import {map} from 'rxjs/operators';
import {HeadersService} from '@services/headers.service';

@Injectable({
  providedIn: 'root'
})
export class ModelService extends AbstractService<Model[], VehicleFilters> {
  constructor(
    protected override http: HttpClient,
    private headersService: HeadersService
  ) {
    super(http);
  }

  protected endpoint(): string {
    return 'model';
  }

  findAllByBrandId(brandId: string, pageSize: number, pageNumber: number): Observable<{ models: Model[], totalItems: number, totalPages: number }> {
    const params = this.createHttpParams({ pageSize, pageNumber });

    return this.http.get<Model[]>(`${this.entrypoint}/${this.endpoint()}/brand/${brandId}`, { params, observe: 'response' }).pipe(
      map((response: HttpResponse<Model[]>) => {
        const headers = response.headers;
        this.headersService.setHeaders(headers);

        const totalItems = headers.get('X-Total-Count');
        const totalPages = headers.get('X-Total-Pages');

        return {
          models: response.body ?? [],
          totalItems: totalItems !== null ? +totalItems : 0,
          totalPages: totalPages !== null ? +totalPages : 0
        };
      })
    );
  }

  findByBrand(filters: VehicleFilters): Observable<Model[]> {
    return this.filter(filters).pipe(
      map((response: HttpResponse<Model[]>) => response.body || []),
      catchError((err) => throwError(err))
    );
  }

  getByModel(model: string): Observable<Model[]> {
    return new Observable<Model[]>((observer) => {
      this.http.get<Model[]>(`${this.entrypoint}/${this.endpoint()}?name=${model}`, { observe: 'response' }).subscribe({
        next: (response: HttpResponse<Model[]>) => {
          observer.next(response.body!);
          observer.complete();
        }, error: (err) =>  observer.error(err)
      });
    });
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
