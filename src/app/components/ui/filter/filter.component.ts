import {Component, ElementRef, ViewChild, OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '@services/errors/error.service';
import { SelectOption } from '@domain/vehicle/select-option';
import { OptionService } from '@services/vehicle/option.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'tcc-filter',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './filter.component.html',
  host: { class: 'w-full md:w-3/5 mb-10' }
})
export class FilterComponent implements OnInit, OnDestroy {
  @ViewChild('brandSelect') brandSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('modelSelect') modelSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('yearSelect') yearSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('vehicleSelect') vehicleSelect!: ElementRef<HTMLSelectElement>;

  brandOptions: SelectOption[] = [];
  modelOptions: SelectOption[] = [];
  yearOptions: SelectOption[] = [];
  vehicleOptions: SelectOption[] = [];

  selectedType: number | undefined;
  selectedBrandId: string | undefined;
  selectedModelId: string | undefined;
  selectedYearId: string | undefined;
  selectedVehicleId: string | undefined;

  private vehicleTypeSubscription: Subscription | undefined;

  constructor(
    private optionService: OptionService,
    private router: Router,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.selectedType = this.getVehicleTypeFromLocalStorage();
    this.loadBrandOptions(this.selectedType);

    this.vehicleTypeSubscription = this.getVehicleTypeObservable().subscribe((type: number) => {
      console.log('Vehicle type changed to:', type);
      this.selectedType = type;
      this.onReset();
      this.loadBrandOptions(type);
    });
  }

  ngOnDestroy(): void {
    if (this.vehicleTypeSubscription) {
      this.vehicleTypeSubscription.unsubscribe();
    }
  }

  getVehicleTypeFromLocalStorage(): number {
    const vehicleType = localStorage.getItem('vehicleType');
    const selectedType = vehicleType != null ? +vehicleType : 0;
    console.log('Selected vehicle type from localStorage:', selectedType);
    return selectedType;
  }

  getVehicleTypeObservable(): BehaviorSubject<number> {
    const vehicleTypeSubject = new BehaviorSubject<number>(this.getVehicleTypeFromLocalStorage());
    window.addEventListener('storage', () => {
      const vehicleType = this.getVehicleTypeFromLocalStorage();
      vehicleTypeSubject.next(vehicleType);
    });
    return vehicleTypeSubject;
  }

  loadBrandOptions(vehicleType: number) {
    if (vehicleType !== undefined) {
      console.log('Loading brand options for vehicle type:', vehicleType);
      this.optionService.findOptions(vehicleType, 'brand').subscribe({
        next: (brandOptions: SelectOption[]) => {
          this.brandOptions = brandOptions;
          console.log('Loaded brand options:', brandOptions);
        },
        error: this.handleError.bind(this)
      });
    }
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
    this.router.navigate(['/vehicle-details', this.selectedVehicleId]).then();
  }

  onReset() {
    this.brandSelect.nativeElement.selectedIndex = 0;
    this.modelSelect.nativeElement.selectedIndex = 0;
    this.yearSelect.nativeElement.selectedIndex = 0;
    this.vehicleSelect.nativeElement.selectedIndex = 0;

    this.selectedBrandId = undefined;
    this.selectedModelId = undefined;
    this.selectedYearId = undefined;
    this.selectedVehicleId = undefined;
    this.brandOptions = [];
    this.modelOptions = [];
    this.yearOptions = [];
    this.vehicleOptions = [];

    localStorage.removeItem('vehicleType');
  }

  private handleError(error: HttpErrorResponse): void {
    this.errorService.handleError(error);
    console.error(error.message);
  }
}
