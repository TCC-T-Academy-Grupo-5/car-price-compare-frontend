/*
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Vehicle} from '@models/vehicle';
import {VehicleService} from '@services/vehicle.service';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {NgForOf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'tcc-vehicle',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatButton,
    NgForOf,
    TranslateModule
  ],
  templateUrl: './vehicle.component.html',
  styles: ``
})
export class VehicleComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;
  vehicles: Vehicle[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private vehicleService: VehicleService) {
    this.filterForm = this.createFilterForm();
  }

  ngOnInit(): void {
    console.log('VehicleComponent initialized');
    this.subscribeToFilteredVehicles();
  }

  private createFilterForm(): FormGroup {
    return this.fb.group({
      model: [''],
      brand: [''],
      year: [''],
      fipePrice: [''],
      type: ['0']
    });
  }

  private subscribeToFilteredVehicles(): void {
    const vehiclesSubscription = this.vehicleService.filteredVehicles$.subscribe(
      (data: Vehicle[]) => {
        console.log('Received filtered vehicles:', data);
        this.vehicles = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching vehicles:', error.message);
      }
    );
    this.subscriptions.add(vehiclesSubscription);
  }

  applyFilter(event: Event): void {
    event.preventDefault();
    const filterData = this.filterForm.value;
    console.log('Applying filters:', filterData);
    this.vehicleService.filterVehicles(filterData);
  }

  ngOnDestroy(): void {
    console.log('VehicleComponent destroyed');
    this.subscriptions.unsubscribe();
  }
}
*/
