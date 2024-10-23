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
  vehicleType!: number | undefined | '';
  page = 1;
  pageSize = 10;

  constructor(
    private route: ActivatedRoute,
    private modelService: ModelService,
    private router: Router,
    private error: ErrorService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.brandName = params['brand'] || '';
      this.vehicleType = params['vehicleType'] ? Number(params['vehicleType']) : undefined;

      console.log('Vehicle Type capturado:', this.vehicleType);
      console.log('Brand capturada:', this.brandName);

      if (this.brandName && this.vehicleType !== undefined) {
        this.getModels();
      }
    });
  }

  public getModels(): void {
    const filters = { vehicleType: this.vehicleType, brand: this.brandName, page: this.page, pageSize: this.pageSize };

    console.log('Filtros enviados:', filters); // TODO remove

    this.modelService.findByBrand(filters).subscribe({
      next: (models: Model[]) => this.models = models,
      error: (err) => this.error.handleError(err)
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
