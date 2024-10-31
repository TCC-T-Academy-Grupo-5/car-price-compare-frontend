import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SelectOption} from '@domain/vehicle/select-option';
import {environment} from '@environments/environment.development';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  private entrypoint = `${environment.entrypoint}`;

  private optionsPaths = {
    brand: (parentId: string | number) => `brand/${parentId}/options`,
    model: (parentId: string | number) => `model/brand/${parentId}/options`,
    year: (parentId: string | number) => `year/model/${parentId}/options`,
    vehicle: (parentId: string | number) => `vehicle/year/${parentId}/options`,
  }

  constructor(private http: HttpClient) {
  }

  public findOptions(parentId: string | number, optionType: 'brand' | 'model' | 'year' | 'vehicle'): Observable<SelectOption[]> {
    const path = this.optionsPaths[optionType](parentId);
    return this.http.get<SelectOption[]>(`${this.entrypoint}/${path}`).pipe(
      map((options: SelectOption[]) =>
        options.sort((a, b) => optionType === 'year' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name))
      )
    );
  }
}
