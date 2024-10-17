import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Vehicle} from '@models/vehicle';
import {VehicleService} from '@services/vehicle.service';
import {VehicleFilterOptions} from '../interfaces/vehicle-filter';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleDataServiceService {
  private vehiclesSubject: BehaviorSubject<Vehicle[]> = new BehaviorSubject<Vehicle[]>([]);
  public vehicles$: Observable<Vehicle[]> = this.vehiclesSubject.asObservable();
  private selectedType: number = 0;

  constructor(private vehicleService: VehicleService) {}

  setVehicleType(type: number): void {
    this.selectedType = type;
    this.fetchVehicles();
  }

  private fetchVehicles(): void {
    const filters: VehicleFilterOptions = { type: this.selectedType };
    this.vehicleService.filterVehicles(filters).subscribe(
      (vehicles: Vehicle[]) => {
        this.vehiclesSubject.next(vehicles);
      },
      (error: HttpErrorResponse) => {
        console.error('Erro ao buscar veículos:', error.message);
      }
    );
  }

  getSelectedType(): number {
    return this.selectedType;
  }
}
