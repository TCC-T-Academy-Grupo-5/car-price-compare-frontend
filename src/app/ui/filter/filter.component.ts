import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorService} from '@services/errors/error.service';
import {SelectOption} from '@domain/vehicle/select-option';
import {OptionService} from '@services/vehicle/option.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'tcc-filter',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule],
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
  selectedVehicleId: string | undefined;

  constructor(private optionService: OptionService,
              private router: Router,
              private errorService: ErrorService) {}

  onTypeChange($event: Event) {
    this.selectedType = Number(($event.target as HTMLSelectElement).value);

    this.optionService.findOptions(this.selectedType, 'brand').subscribe({
      next: (brandOptions: SelectOption[]) => this.brandOptions = brandOptions,
      error: this.handleError.bind(this)
    });
  }

  onBrandChange($event: Event) {
    this.selectedBrandId = ($event.target as HTMLSelectElement).value;

    this.optionService.findOptions(this.selectedBrandId, 'model').subscribe({
      next: (modelOptions: SelectOption[]) => this.modelOptions = modelOptions,
      error: this.handleError.bind(this)
    });
  }

  onModelChange($event: Event) {
    this.selectedModelId = ($event.target as HTMLSelectElement).value;

    this.optionService.findOptions(this.selectedModelId, 'year').subscribe({
      next: (yearOptions: SelectOption[]) => this.yearOptions = yearOptions,
      error: this.handleError.bind(this)
    });
  }

  onYearChange($event: Event) {
    this.selectedYearId = ($event.target as HTMLSelectElement).value;

    this.optionService.findOptions(this.selectedYearId, 'vehicle').subscribe({
      next: (vehicleOptions: SelectOption[]) => this.vehicleOptions = vehicleOptions,
      error: this.handleError.bind(this)
    });
  }

  onVehicleChange($event: Event) {
    this.selectedVehicleId = ($event.target as HTMLSelectElement).value;
  }

  onSubmit() {
    this.router.navigate(['/vehicle-details', this.selectedVehicleId]);
  }

  onReset() {
    this.selectedType = undefined;
    this.selectedBrandId = undefined;
    this.selectedModelId = undefined;
    this.selectedYearId = undefined;
    this.brandOptions = [];
    this.modelOptions = [];
    this.yearOptions = [];
    this.vehicleOptions = [];
  }

  private handleError(error: HttpErrorResponse): void {
    this.errorService.handleError(error);
    console.error(error.message);
  }
}

