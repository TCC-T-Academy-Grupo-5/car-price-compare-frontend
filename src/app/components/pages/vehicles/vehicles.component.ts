import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {VehicleService} from '@services/vehicle/vehicle.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {VehicleFilters} from '@domain/vehicle/vehicle-filters';
import {SkeletonLoaderComponent} from '@components/shared/skeleton-loader/skeleton-loader';
import {PaginationComponent} from '@components/ui/pagination/pagination.component';
import {Vehicle} from '@domain/vehicle/vehicle';
import {Model} from '@domain/vehicle/model';
import {HeadersService} from '@services/headers.service';

interface QueryParams {
  model?: string;
  imageUrl?: string;
  brand?: string;
}

@Component({
  selector: 'tcc-vehicles',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    NgIf,
    TranslateModule,
    RouterLink,
    SkeletonLoaderComponent,
    PaginationComponent,
  ],
  templateUrl: './vehicles.component.html',
  styles: ``
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  model: Model | null = null;
  isLoading = false;
  paginate = {
    totalItems: 0,
    totalPages: 0,
    pageNumber: 1,
    pageSize: 12,
    hasNext: false
  };
  vehicleType = 0;
  brand = '';

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private headersService: HeadersService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const { model, imageUrl, brand } = this.fetchDataFromParams(params);
      this.vehicleType = Number(localStorage.getItem('vehicleType')) || 0;
      this.brand = brand;
      const selectedModel: Model = { name: model, imageUrl };

      if (model && this.vehicleType >= 0 && brand) {
        this.getVehicles(selectedModel, this.vehicleType, brand);
      }
    });
  }

  fetchDataFromParams(params: QueryParams): { model: string, imageUrl: string, brand: string } {
    const modelName = params['model'] || '';
    const modelImageUrl = params['imageUrl'] || '';
    const brandName = params['brand'] || '';
    return { model: modelName, imageUrl: modelImageUrl, brand: brandName };
  }

  getVehicles(model: Model, vehicleType: number, brand: string) {
    this.isLoading = true;
    const filters: VehicleFilters = {
      model: model.name,
      vehicleType,
      pageNumber: this.paginate.pageNumber,
      pageSize: this.paginate.pageSize,
      brand
    };

    this.vehicleService.findVehicles(filters).subscribe({
      next: (response) => {
        this.vehicles = response.vehicles;
        this.model = model;
        this.isLoading = false;
        this.updatePaginationData();
      },
      error: () => this.isLoading = false
    });
  }

  updatePaginationData() {
    this.paginate.totalItems = this.headersService.totalElements;
    this.paginate.totalPages = this.headersService.totalPages;
    this.paginate.pageNumber = this.headersService.currentPage;
    this.paginate.pageSize = this.headersService.pageSize;
    this.paginate.hasNext = this.headersService.currentPage < this.headersService.totalPages;
  }

  onPageChange(newPage: number): void {
    this.paginate.pageNumber = newPage;
    if (this.model) {
      this.getVehicles(this.model, this.vehicleType, this.brand);
    }
  }

  onPageSizeChange(newPageSize: number): void {
    this.paginate.pageSize = newPageSize;
    this.paginate.pageNumber = 1;
    if (this.model) {
      this.getVehicles(this.model, this.vehicleType, this.brand);
    }
  }
}
