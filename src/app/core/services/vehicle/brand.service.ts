import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractService} from '@services/vehicle/abstract.service';
import {PaginatedBrand} from '@domain/vehicle/paginate-brand';
import {HeadersService} from '@services/headers.service';
import { Brand } from '@domain/vehicle/brand';
import {SelectOption} from '@domain/vehicle/select-option';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends AbstractService<PaginatedBrand, { vehicleType: number, page: number, pageSize: number }> {

  constructor(
    protected override http: HttpClient,
    private headersService: HeadersService
  ) {
    super(http);
  }

  protected endpoint(): string {
    return 'brand';
  }

  findByType(filters: { vehicleType: number, page: number, pageSize: number }): Observable<PaginatedBrand> {
    return new Observable<PaginatedBrand>((observer) => {
      this.filter(filters).subscribe({
        next: (response: HttpResponse<PaginatedBrand>) => {
          observer.next(response.body!);
          observer.complete();
        }, error: (err: HttpErrorResponse) => observer.error(err)
      });
    });
  }

  findAllBrandOptionsByType(vehicleType: number): Observable<SelectOption[]> {
    return this.http.get<SelectOption[]>(`${this.entrypoint}/brand/${vehicleType}/options`);
  }

  findById(brandId: string): Observable<Brand> {
    return this.http.get<Brand>(`${this.entrypoint}/brand/${brandId}`);
  }

  getByBrand(brand: string): Observable<Brand[]> {
    return new Observable<Brand[]>((observer) => {
      this.http.get<Brand[]>(`${this.entrypoint}/${this.endpoint()}?name=${brand}`, { observe: 'response' }).subscribe({
        next: (response: HttpResponse<Brand[]>) => {
          observer.next(response.body!);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        }
      })
    });
  }
}
