import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {Vehicle} from '@domain/vehicle/vehicle';
import {VehicleService} from '@services/vehicle/vehicle.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {VehicleFilters} from '@domain/vehicle/vehicle-filters';
import {SkeletonLoaderComponent} from '@shared/skeleton-loader/skeleton-loader';

@Component({
  selector: 'tcc-vehicles',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    NgIf,
    TranslateModule,
    RouterLink,
    SkeletonLoaderComponent
  ],
  templateUrl: './vehicles.component.html',
  styles: ``
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  selectedModelName?: string;
  selectedBrand?: string;
  selectedType?: number;
  page = 1;
  pageSize = 10;
  isLoading!: boolean;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedModelName = params['model'] || '';
      this.selectedBrand = params['brand'] || '';
      this.selectedType = params['type'] ? Number(params['type']) : undefined;
      this.isLoading= true;
      this.getVehicles();
    });
  }

  getVehicles() {
    const filters: VehicleFilters = {
      model: this.selectedModelName,
      brand: this.selectedBrand,
      vehicleType: this.selectedType,
      page: this.page,
      pageSize: this.pageSize
    };

    this.vehicleService.findVehicles(filters).subscribe({
      next: (vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
        this.isLoading = false;
      }, error: () => this.isLoading = false
    });
  }
}
