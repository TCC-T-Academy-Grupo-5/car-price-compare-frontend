import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {Vehicle} from '@domain/vehicle/vehicle';
import {VehicleService} from '@services/vehicle/vehicle.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {VehicleFilters} from '@domain/vehicle/vehicle-filters';
import {SkeletonLoaderComponent} from '@components/shared/skeleton-loader/skeleton-loader';
import {Model} from '@domain/vehicle/model';
import {ModelService} from '@services/vehicle/model.service';

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
  model: Model | null = null;
  selectedModelName?: string;
  selectedBrand?: string;
  selectedType?: number;
  page = 1;
  pageSize = 10;
  isLoading!: boolean;

  constructor(
    private vehicleService: VehicleService,
    private modelService: ModelService,
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

    this.isLoading = true;
    this.vehicleService.findVehicles(filters).subscribe({
      next: (response) => {
        console.log(response);
        this.vehicles = response.vehicles;

        // FIXME: Gambiarra, até criarmos o endpoint para model/:id na API
        if (this.selectedModelName) {
          this.modelService.getByModel(this.selectedModelName).subscribe({
            next: (modelResponse) => {
              if (modelResponse.length > 0) {
                this.model = modelResponse[0];
                this.isLoading = false;
              } else {
                this.model = null;
                this.isLoading = false;
              }
            }, error: () =>  this.isLoading = false
          });
        } else {
          this.isLoading = false;
        }
      },
      error: () => this.isLoading = false
    });
  }
}
