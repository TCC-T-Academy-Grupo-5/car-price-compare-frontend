import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ModelService} from '@services/vehicle/model.service';
import {TranslateModule} from '@ngx-translate/core';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {Model} from '@domain/vehicle/model';
import {ErrorService} from '@services/errors/error.service';

@Component({
  selector: 'tcc-domain',
  standalone: true,
  imports: [
    TranslateModule,
    NgForOf,
    CurrencyPipe,
    NgIf,
    RouterLink
  ],
  templateUrl: './models.component.html',
  styles: ``
})
export class ModelsComponent implements OnInit {
  models: Model[] = [];
  brandName!: string;
  type!: number;
  page = 1;
  pageSize = 10;
  totalItems = 0;

  constructor(
    private route: ActivatedRoute,
    private modelService: ModelService,
    private router: Router,
    private error: ErrorService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.brandName = params['brand'] || '';
      if (this.brandName) {
        this.getModels();
      }
    });
  }

  public getModels(): void {
    const filters = { vehicleType: this.type, brand: this.brandName, page: this.page, pageSize: this.pageSize };
    this.modelService.findByBrand(filters).subscribe({
      next: (models: Model[]) => {
        this.models = models;
        console.log('Modelos carregados:', this.models);
      },
      error: (err) => {
        console.error('Erro ao carregar modelos:', err);
      }
    });
  }

  selectModel(modelName: string): void {
    if (modelName) {
      this.router.navigate(['/vehicles'], {
        queryParams: { model: String(modelName) }
      }).then(r => console.log('redirect', r));
    }
  }
}
