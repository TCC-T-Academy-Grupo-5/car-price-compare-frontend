import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {BrandService} from '@services/vehicle/brand.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorService} from '@services/errors/error.service';
import {SelectOption} from '@domain/vehicle/select-option';
import {ModelService} from '@services/vehicle/model.service';
import {YearService} from '@services/vehicle/year.service';
import {VehicleService} from '@services/vehicle/vehicle.service';

@Component({
  selector: 'tcc-filter',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './filter.component.html'
})
export class FilterComponent {
  vehicleTypes = {
    'car': 0,
    'motorcycle': 1,
    'truck': 2
  }
  brandOptions: SelectOption[] = [];
  modelOptions: SelectOption[] = [];
  yearOptions: SelectOption[] = [];
  vehicleOptions: SelectOption[] = [];

  selectedType: number | undefined;
  selectedBrandId: string | undefined;
  selectedModelId: string | undefined;
  selectedYearId: string | undefined;

  constructor(private brandService: BrandService,
              private modelService: ModelService,
              private yearService: YearService,
              private vehicleService: VehicleService,
              private errorService: ErrorService) {}

  onTypeChange($event: Event) {
    this.selectedType = Number(($event.target as HTMLSelectElement).value);

    this.brandService.findAllBrandOptionsByType(this.selectedType).subscribe({
      next: (brandOptions: SelectOption[]) => this.brandOptions = brandOptions,
      error: this.handleError.bind(this)
    })
  }

  onBrandChange($event: Event) {
    this.selectedBrandId = ($event.target as HTMLSelectElement).value;

    this.modelService.findAllModelOptionsByBrandId(this.selectedBrandId).subscribe({
      next: (modelOptions: SelectOption[]) => this.modelOptions = modelOptions,
      error: this.handleError.bind(this)
    })
  }

  onModelChange($event: Event) {
    this.selectedModelId = ($event.target as HTMLSelectElement).value;

    this.yearService.findAllYearOptionsByModelId(this.selectedModelId).subscribe({
      next: (yearOptions: SelectOption[]) => this.yearOptions = yearOptions,
      error: this.handleError.bind(this)
    })
  }

  onYearChange($event: Event) {
    this.selectedYearId = ($event.target as HTMLSelectElement).value;

    this.vehicleService.findVehicleOptionsByYearId(this.selectedYearId).subscribe({
      next: (vehicleOptions: SelectOption[]) => this.vehicleOptions = vehicleOptions,
      error: this.handleError.bind(this)
    })
  }

  private handleError(error: HttpErrorResponse): void {
    this.errorService.handleError(error);
    console.error(error.message);
  }
}

