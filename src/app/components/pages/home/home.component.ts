import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import { MatCard, MatCardContent, MatCardImage } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatTab, MatTabContent, MatTabGroup } from '@angular/material/tabs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { InteractionDirective } from '@directives/EventListenerDirectives';
import { FilterTypeComponent } from '@components/ui/vehicle/filter-type/filter-type.component';
import { FilterBrandComponent } from '@components/ui/vehicle/filter-brand/filter-brand.component';
import { BrandService } from '@services/vehicle/brand.service';
import { Brand } from '@domain/vehicle/brand';
import { FormsModule } from '@angular/forms';
import { TranslationsPipe } from '@pipes/translations.pipe';
import { FilterComponent } from '@components/ui/filter/filter.component';
import { SpinnerComponent } from '@components/shared/spinner/spinner.component';
import { SearchComponent } from '@components/ui/search/search.component';

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
    FormsModule,
    SpinnerComponent,
    TranslationsPipe,
    FilterComponent,
    SearchComponent,
  ],
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent implements OnInit {
  brands: Brand[] = [];
  page = 1;
  pageSize = 100;
  selectedType = 0;
  vehicleTypes: string[] = ['car', 'motorcycle', 'truck'];
  vehicleImgDesktop!: string;
  vehicleImgMobile!: string;
  showLoadMore = true;

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.updateImagePaths(this.selectedType);
    this.getPopularBrands();
  }

  onTypeSelected(type: number): void {
    this.selectedType = type;
    this.getPopularBrands();
    this.updateImagePaths(type);
    this.showLoadMore = true;
  }

  updateImagePaths(type: number): void {
    const selectedVehicleType = this.vehicleTypes[type];
    this.vehicleImgDesktop = `/assets/images/vehicle_type/${selectedVehicleType}_desktop.png`;
    this.vehicleImgMobile = `/assets/images/vehicle_type/${selectedVehicleType}_mobile.png`;
  }

  getPopularBrands(): void {
    const filters = {
      vehicleType: this.selectedType,
      pageNumber: this.page,
      pageSize: this.pageSize,
    };

    this.brandService.findBrandsByType(filters, 'POPULAR').subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.brands = response;
          this.showLoadMore = true;
        }
      },
      error: (error) => {
        console.error('Erro ao carregar marcas:', error.message);
      },
    });
  }

  getNotPopularBrands(): void {
    const filters = {
      vehicleType: this.selectedType,
      pageNumber: this.page,
      pageSize: this.pageSize,
    };

    this.brandService.findBrandsByType(filters, 'NOT_POPULAR').subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.brands = this.brands.concat(response);
          this.showLoadMore = false;
        }
      },
      error: (error) => {
        console.error('Erro ao carregar marcas:', error.message);
      },
    });
  }
}
