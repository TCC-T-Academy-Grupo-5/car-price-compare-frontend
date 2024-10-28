import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe, NgOptimizedImage} from "@angular/common";
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {MatTab, MatTabContent, MatTabGroup} from "@angular/material/tabs";
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {InteractionDirective} from '@directives/EventListenerDirectives';
import {FilterTypeComponent} from '@ui/vehicle/filter-type/filter-type.component';
import {FilterBrandComponent} from '@ui/vehicle/filter-brand/filter-brand.component';
import {BrandService} from '@services/vehicle/brand.service';
import {Brand} from '@domain/vehicle/brand';
import { ModelService } from '@services/vehicle/model.service';
import { Model } from '@domain/vehicle/model';
import { FormsModule } from '@angular/forms';
import {TranslationsPipe} from '@pipes/translations.pipe';
import {SpinnerComponent} from '@shared/spinner/spinner.component';
import {FilterComponent} from '@ui/filter/filter.component';

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
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit {
  brands: Brand[] = [];
  page = 1;
  pageSize = 100;
  selectedType = 0;
  searchText = '';
  brandsSuggestions: Brand[] = [];
  modelSuggestions: Model[] = [];
  vehicleTypes: string[] = ['car', 'motorcycle', 'truck'];
  vehicleImgDesktop!: string;
  vehicleImgMobile!: string;

  constructor(
    private brandService: BrandService,
    private modelService: ModelService,
    private router: Router,
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
        if (Array.isArray(response)) {
          this.brands = response;
        } else {
          console.log('Resposta inválida ou vazia.');
        }
      },
      error: (error) => {
        console.error("Erro ao carregar marcas:", error.message);
      }
    });
  }

  onSearchTextChange(): void {
    if (this.searchText.length > 0) {
      this.modelService.getByModel(this.searchText).subscribe({
        next: (response) => {
          this.modelSuggestions = response;
        },
        error: (err) => {
          console.error('Erro ao carregar modelos:', err.message);
        }
      });

      this.brandService.getByBrand(this.searchText).subscribe({
        next: (response) =>  this.brandsSuggestions = response,
        error: (err) => console.error('Erro ao carregar marcas:', err.message)
      });
    } else {
      this.modelSuggestions = [];
      this.brandsSuggestions = [];
    }
  }

  onBrandSelected(name: string | undefined): void {
    if (name) {
      this.router.navigate(['/models'], {state: {brand: name, vehicleType: this.selectedType}}).then();
     }
  }

  onModelSelected(name: string | undefined): void {
    if (name) {
      this.router.navigate(['/vehicles'], { state: { model: name } }).then();
    }
  }
}
