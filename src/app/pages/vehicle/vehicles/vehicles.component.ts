import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {Vehicle} from '@domain/vehicle/vehicle';
import {VehicleService} from '@services/vehicle/vehicle.service';
import {ActivatedRoute} from '@angular/router';
import {ErrorService} from '@services/errors/error.service';

@Component({
  selector: 'tcc-vehicles',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    NgIf,
    TranslateModule
  ],
  templateUrl: './vehicles.component.html',
  styles: ``
})
export class VehiclesComponent implements OnInit{
  vehicles: Vehicle[] = [];
  selectedModelName!: string;
  modelName!: string;
  type!: number;
  page = 1;
  pageSize = 10;
  totalItems = 0;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private error: ErrorService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedModelName = params['model'] || '';
      if (this.selectedModelName) {
        this.getVehicles();
      }
    });
  }

  getVehicles() {
    this.vehicleService.findByModel({ vehicleType: this.type, model: this.modelName, page: this.page, pageSize: this.pageSize }).subscribe({
      next: (vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
        console.log('Veiculos carregados:', this.vehicles);
      },
      error: (err) => {
        console.error('Erro ao carregar veiculos:', err);
      }
    });
  }
}
