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
import {PaginationComponent} from '@components/ui/pagination/pagination.component';

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
    SpinnerComponent,
    PaginationComponent
  ],
  templateUrl: './models.component.html',
  styles: ``
})
export class ModelsComponent implements OnInit {
  brandId!: string;
  brand: Brand | null = null;
  models: Model[] = [];
  isLoading = false;
  paginate = {
    totalItems: 0,
    totalPages: 0,
    pageNumber: 1,
    pageSize: 120,
    hasNext: false
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modelService: ModelService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.brandId = params.get('brandId') as string;
      this.fetchBrandDetails(this.brandId);
      this.isLoading = true;
    });
  }

  fetchModelsByBrand(brandId: string): void {
    this.modelService.findAllByBrandId(brandId, this.paginate.pageSize, this.paginate.pageNumber).subscribe({
      next: (response) => {
        this.models = response.models;
        this.updatePaginationData(response.totalItems, response.totalPages);
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
      next: (brand) => {
        this.brand = brand;
        this.fetchModelsByBrand(this.brandId);
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes da marca:', err.message);
        this.isLoading = false;
      }
    });
  }

  updatePaginationData(totalItems: number, totalPages: number): void {
    this.paginate.totalItems = totalItems;
    this.paginate.totalPages = totalPages;
    this.paginate.hasNext = this.paginate.pageNumber < totalPages;
  }

  onPageChange(newPage: number): void {
    this.paginate.pageNumber = newPage;
    this.fetchModelsByBrand(this.brandId);
  }

  onPageSizeChange(newPageSize: number): void {
    this.paginate.pageSize = newPageSize;
    this.paginate.pageNumber = 1;
    this.fetchModelsByBrand(this.brandId);
  }

  selectModel(model: Model): void {
    if (model.name && this.brand) {
      this.router.navigate(['/vehicles'], {
        queryParams: {
          model: model.name,
          imageUrl: model.imageUrl || '',
          brand: this.brand.name
        }
      }).then();
    }
  }
}
