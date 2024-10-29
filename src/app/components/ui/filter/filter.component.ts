import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorService} from '@services/errors/error.service';
import {SelectOption} from '@domain/vehicle/select-option';
import {OptionService} from '@services/vehicle/option.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'tcc-filter',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './filter.component.html',
  host: {class: 'w-full md:w-3/5 mb-10'}
})
export class FilterComponent {
  @ViewChild('typeSelect') typeSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('brandSelect') brandSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('modelSelect') modelSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('yearSelect') yearSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('vehicleSelect') vehicleSelect!: ElementRef<HTMLSelectElement>;

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

    console.log('selecionou tipo de veículo', this.selectedType);

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
    this.typeSelect.nativeElement.selectedIndex = 0;
    this.brandSelect.nativeElement.selectedIndex = 0;
    this.modelSelect.nativeElement.selectedIndex = 0;
    this.yearSelect.nativeElement.selectedIndex = 0;
    this.vehicleSelect.nativeElement.selectedIndex = 0;

    this.selectedType = undefined;
    this.selectedBrandId = undefined;
    this.selectedModelId = undefined;
    this.selectedYearId = undefined;
    this.selectedVehicleId = undefined;
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

