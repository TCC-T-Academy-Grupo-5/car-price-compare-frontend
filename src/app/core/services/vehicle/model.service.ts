import { Injectable } from '@angular/core';
import {AbstractService} from '@services/vehicle/abstract.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Model} from '@domain/vehicle/model';
import {VehicleFilters} from '@domain/vehicle/vehicle-filters';
import {map} from 'rxjs/operators';
import {SelectOption} from '@domain/vehicle/select-option';

@Injectable({
  providedIn: 'root'
})
export class ModelService extends AbstractService<Model[], VehicleFilters> {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  protected endpoint(): string {
    return 'model';
  }

  findAllByBrandId(brandId: string, pageSize: number, pageNumber: number): Observable<Model[]> {
    const url = `${this.entrypoint}/model/brand/${brandId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<Model[]>(url);
  }

  public findByBrand(filters: VehicleFilters): Observable<Model[]> {
    return this.filter(filters).pipe(
      map((response: HttpResponse<Model[]>) => response.body || []),
      catchError((err) => throwError(err))
    );
  }

  public findAllModelOptionsByBrandId(brandId: string): Observable<SelectOption[]> {
    return this.http.get<SelectOption[]>(`${this.entrypoint}/model/brand/${brandId}/options`);
  }

  public getByModel(model: string): Observable<Model[]> {
    return new Observable<Model[]>((observer) => {
      this.http.get<Model[]>(`${this.entrypoint}/${this.endpoint()}?name=${model}`, { observe: 'response' }).subscribe({
        next: (response: HttpResponse<Model[]>) => {
          observer.next(response.body!);
          observer.complete();
        }, error: (err) =>  observer.error(err)
      });
    });
  }
}
