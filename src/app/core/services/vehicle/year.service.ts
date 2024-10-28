import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SelectOption} from '@domain/vehicle/select-option';
import {environment} from '@environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class YearService {

  private entryPoint = `${environment.entrypoint}`;

  constructor(private http: HttpClient) { }

  public findAllYearOptionsByModelId(modelId: string): Observable<SelectOption[]> {
    return this.http.get<SelectOption[]>(`${this.entryPoint}/year/model/${modelId}/options`);
  }
}
