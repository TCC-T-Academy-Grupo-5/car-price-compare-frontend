import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ModelService} from '@services/vehicle/model.service';
import {TranslateModule} from '@ngx-translate/core';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {Model} from '@domain/vehicle/model';
import {Brand} from '@domain/vehicle/brand';
import {BrandService} from '@services/vehicle/brand.service';
import {SpinnerComponent} from '@components/shared/spinner/spinner.component';
import {SkeletonLoaderComponent} from '@components/shared/skeleton-loader/skeleton-loader';

@Component({
  selector: 'tcc-domain',
  standalone: true,
  imports: [
    TranslateModule,
    NgForOf,
    CurrencyPipe,
    NgIf,
    RouterLink,
    SkeletonLoaderComponent,
    SpinnerComponent
  ],
  templateUrl: './models.component.html',
  styles: ``
})
export class ModelsComponent implements OnInit {
  brandId!: string;
  brand: Brand | null = null;
  models: Model[] = [];
  isLoading = false;
  pageSize = 10;
  pageNumber = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modelService: ModelService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.brandId = params.get('brandId')!;
      this.fetchBrandDetails(this.brandId);
      this.isLoading = true;
    });
  }

  fetchModelsByBrand(brandId: string, pageSize: number, pageNumber: number): void {
    this.modelService.findAllByBrandId(brandId, pageSize, pageNumber).subscribe({
      next: (models: Model[]) => {
        this.models = models;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar os modelos:', err.message);
        this.isLoading = false;
      }
    });
  }

  fetchBrandDetails(brandId: string): void {
    this.brandService.findById(brandId).subscribe({
      next: (brand: Brand) => {
        this.brand = brand;
        this.fetchModelsByBrand(this.brandId, this.pageSize, this.pageNumber);
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes da marca:', err.message);
        this.isLoading = false;
      }
    });
  }

  selectModel(modelId: string): void {
    if (modelId) {
      this.router.navigate(['/vehicles'], {
        queryParams: { model: String(modelId) }
      }).then(r => console.log('redirect', r));
    }
  }
}
