import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractService} from '@services/vehicle/abstract.service';
import {PaginatedBrand} from '@domain/vehicle/paginate-brand';
import {HeadersService} from '@services/headers.service';

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

  protected apiEndpoint(): string {
    return 'brand';
  }

  public findByType(filters: { vehicleType: number, page: number, pageSize: number }): Observable<PaginatedBrand> {
    return new Observable<PaginatedBrand>((observer) => {
      this.filter(filters).subscribe({
        next: (response: HttpResponse<PaginatedBrand>) => {
          observer.next(response.body!);
          observer.complete();
        },
        error: (err: HttpErrorResponse) => {
          observer.error(err);
        }
      });
    });
  }

}
