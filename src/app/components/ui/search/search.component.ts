import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ModelService} from '@services/vehicle/model.service';
import {BrandService} from '@services/vehicle/brand.service';
import {Brand} from '@domain/vehicle/brand';
import {Model} from '@domain/vehicle/model';
import {TranslateModule} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'tcc-search',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule,
    CommonModule
  ],
  templateUrl: './search.component.html'
})
export class SearchComponent {
  searchText = '';
  brandsSuggestions: Brand[] = [];
  modelSuggestions: Model[] = [];
  selectedType = 0;

  constructor(private modelService: ModelService,
              private brandService: BrandService,
              private router: Router) {
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
