import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe, NgOptimizedImage} from "@angular/common";
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {MatTab, MatTabContent, MatTabGroup} from "@angular/material/tabs";
import {RouterLink, RouterOutlet} from '@angular/router';
import {InteractionDirective} from '@directives/EventListenerDirectives';
import {FilterTypeComponent} from '@ui/vehicle/filter-type/filter-type.component';
import {FilterBrandComponent} from '@ui/vehicle/filter-brand/filter-brand.component';
import {BrandService} from '@services/vehicle/brand.service';
import {Brand} from '@domain/vehicle/brand';
import {ErrorService} from '@services/errors/error.service';
import {HeadersService} from '@services/headers.service';

@Component({
  selector: 'tcc-home',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatCardImage,
    MatCard,
    MatCardContent,
    TranslateModule,
    MatTabGroup,
    MatTab,
    MatTabContent,
    DatePipe,
    RouterOutlet,
    RouterLink,
    InteractionDirective,
    FilterTypeComponent,
    FilterBrandComponent,
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit {
  brands: Brand[] = [];
  page = 1;
  pageSize = 100;
  selectedType = 0;
  totalPages = 0;

  vehicleImgDesktop!: string;
  vehicleImgMobile!: string;
  vehicleTypes: string[] = ['car', 'motorcycle', 'truck'];

  constructor(
    private brandService: BrandService,
    private errorService: ErrorService,
    private headersService: HeadersService
  ) {}

  ngOnInit(): void {
    this.updateImagePaths(this.selectedType);
    this.fetchBrands();
  }

  onTypeSelected(type: number): void {
    this.selectedType = type;
    this.fetchBrands();
    this.updateImagePaths(type);
  }

  updateImagePaths(type: number): void {
    const selectedVehicleType = this.vehicleTypes[type];
    this.vehicleImgDesktop = `/assets/images/vehicle_type/${selectedVehicleType}_desktop.png`;
    this.vehicleImgMobile = `/assets/images/vehicle_type/${selectedVehicleType}_mobile.png`;
  }

  fetchBrands(): void {
    const filters = { vehicleType: this.selectedType, page: this.page, pageSize: this.pageSize };

    this.brandService.findByType(filters).subscribe({
      next: (response) => {
        console.log('Resposta da API:', response);
        if (Array.isArray(response)) {
          this.brands = response;
          console.log('Marcas recebidas:', this.brands);
        } else {
          console.log('Resposta inválida ou vazia.');
        }
      },
      error: (error) => {
        this.errorService.handleError(error);
        console.error("Erro ao carregar marcas: ", error.message);
      }
    });
  }

}

