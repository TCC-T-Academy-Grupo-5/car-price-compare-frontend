import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractService} from '@services/vehicle/abstract.service';
import {PaginatedBrand} from '@domain/vehicle/paginate-brand';
import { Brand } from '@domain/vehicle/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends AbstractService<PaginatedBrand, { vehicleType: number, pageNumber: number, pageSize: number }> {

  constructor(
    protected override http: HttpClient,
  ) {
    super(http);
  }

  protected endpoint(): string {
    return 'brand';
  }

  findBrandsByType(
    filters: { vehicleType: number; pageNumber: number; pageSize: number; },
    brandType: 'ALL' | 'POPULAR' | 'NOT_POPULAR'
  ): Observable<PaginatedBrand> {

    return new Observable<PaginatedBrand>((observer) => {
      const endpoint = `${this.endpoint()}?pageNumber=${filters.pageNumber}&pageSize=${filters.pageSize}&brandType=${brandType}`;
      this.filter(filters, endpoint).subscribe({
        next: (response: HttpResponse<PaginatedBrand>) => {
          observer.next(response.body!);
          observer.complete();
        },
        error: (err: HttpErrorResponse) => observer.error(err)
      });
    });
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
