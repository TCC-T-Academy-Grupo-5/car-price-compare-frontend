import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {BrandService} from '@services/vehicle/brand.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorService} from '@services/errors/error.service';
import {SelectOption} from '@domain/vehicle/select-option';
import {ModelService} from '@services/vehicle/model.service';
import {NgSelectModule} from '@ng-select/ng-select';

@Component({
  selector: 'tcc-filter',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgSelectModule],
  templateUrl: './filter.component.html'
})
export class FilterComponent {
  vehicleTypesObject = {
    'car': 0,
    'motorcycle': 1,
    'truck': 2
  }
  brandOptions: SelectOption[] = [];
  modelOptions: SelectOption[] = [];

  selectedType: number | undefined;
  selectedBrandId: string | undefined;

  constructor(private brandService: BrandService, private modelService: ModelService, private errorService: ErrorService) {}

  onTypeChange($event: Event) {
    this.selectedType = Number(($event.target as HTMLSelectElement).value);

    this.brandService.findAllBrandOptionsByType(this.selectedType).subscribe({
      next: (brandOptions: SelectOption[]) => this.brandOptions = brandOptions,
      error: (error: HttpErrorResponse) => {
        this.errorService.handleError(error);
        console.error(error.message);
      }
    })
  }

  onBrandChange($event: Event) {
    this.selectedBrandId = ($event.target as HTMLSelectElement).value;

    this.modelService.findAllModelOptionsByBrandId(this.selectedBrandId).subscribe({
      next: (modelOptions: SelectOption[]) => this.modelOptions = modelOptions,
    })
  }
}

