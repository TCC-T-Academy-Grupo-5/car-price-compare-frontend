import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe, NgOptimizedImage} from "@angular/common";
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {MatTab, MatTabContent, MatTabGroup} from "@angular/material/tabs";
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {InteractionDirective} from '@directives/EventListenerDirectives';
import {FilterTypeComponent} from '@components/ui/vehicle/filter-type/filter-type.component';
import {FilterBrandComponent} from '@components/ui/vehicle/filter-brand/filter-brand.component';
import {BrandService} from '@services/vehicle/brand.service';
import {Brand} from '@domain/vehicle/brand';
import {ModelService} from '@services/vehicle/model.service';
import {Model} from '@domain/vehicle/model';
import {FormsModule} from '@angular/forms';
import {TranslationsPipe} from '@pipes/translations.pipe';
import {SpinnerComponent} from '@components/shared/spinner/spinner.component';

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
  showLoadMore = true;

  constructor(
    private brandService: BrandService,
    private modelService: ModelService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.selectedType = Number(localStorage.getItem('selectedType')) || this.selectedType;
    this.searchText = localStorage.getItem('searchText') || this.searchText;
    this.updateImagePaths(this.selectedType);
    this.getPopularBrands();
  }

  onTypeSelected(type: number): void {
    this.selectedType = type;
    this.getPopularBrands();
    this.updateImagePaths(type);
    this.showLoadMore = true;
    localStorage.setItem('selectedType', type.toString());
  }

  updateImagePaths(type: number): void {
    const selectedVehicleType = this.vehicleTypes[type];
    this.vehicleImgDesktop = `/assets/images/vehicle_type/${selectedVehicleType}_desktop.png`;
    this.vehicleImgMobile = `/assets/images/vehicle_type/${selectedVehicleType}_mobile.png`;
  }

  getPopularBrands(): void {
    const filters = {vehicleType: this.selectedType, pageNumber: this.page, pageSize: this.pageSize};

    this.brandService.findBrandsByType(filters, 'POPULAR').subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.brands = response;
          this.showLoadMore = true;
        }
      }, error: (error) => console.error("Erro ao carregar marcas:", error.message)
    });
  }

  getNotPopularBrands(): void {
    const filters = { vehicleType: this.selectedType, pageNumber: this.page, pageSize: this.pageSize };

    this.brandService.findBrandsByType(filters, 'NOT_POPULAR').subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.brands = this.brands.concat(response);
          this.showLoadMore = false;
        }
      }, error: (error) =>  console.error("Erro ao carregar marcas:", error.message)
    });
  }

  onSearchTextChange(): void {

    localStorage.setItem('searchText', this.searchText);
    if (this.searchText.length > 0) {
      this.modelService.getByModel(this.searchText).subscribe({
        next: (response) => {
          this.modelSuggestions = response;
        }, error: (err) => console.error('Erro ao carregar modelos:', err.message)
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
