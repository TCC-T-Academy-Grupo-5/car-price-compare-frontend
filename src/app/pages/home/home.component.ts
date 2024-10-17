import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe, NgOptimizedImage} from "@angular/common";
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {MatTab, MatTabContent, MatTabGroup} from "@angular/material/tabs";
import {RouterLink, RouterOutlet} from '@angular/router';
import {VehicleService} from '@services/vehicle.service';
import {VehicleFilterOptions} from '../../core/interfaces/vehicle-filter';
import {Vehicle} from '@models/vehicle';
import {InteractionDirective} from '@directives/EventListenerDirectives';
import {HttpErrorResponse} from '@angular/common/http';
import {FilterTypeComponent} from '@ui/vehicle/filter-type/filter-type.component';

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
    FilterTypeComponent
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit {
  selectedType: number = 0;
  vehicleTypes: string[] = ['car', 'motorcycle', 'truck'];
  categories: string[] = [];
  vehicles: Vehicle[] = [];
  errorMessage: string | null = null;
  vehicleImgDesktop!: string;
  vehicleImgMobile!: string;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.updateImagePaths(this.selectedType);
    this.fetchVehicles();
  }

  onTypeSelected(type: number): void {
    console.log(`Tipo selecionado: ${type}`);
    this.selectedType = type;
    this.updateCategories();
    this.fetchVehicles();
    this.updateImagePaths(type);
  }

  updateImagePaths(type: number): void {
    const selectedVehicleType = this.vehicleTypes[type];
    this.vehicleImgDesktop = this.imagePath(selectedVehicleType, 'desktop');
    this.vehicleImgMobile = this.imagePath(selectedVehicleType, 'mobile');
  }

  imagePath(type: string, device: 'desktop' | 'mobile'): string {
    return `/assets/images/vehicle_type/${type.toLowerCase()}_${device}.png`;
  }

  updateCategories(): void {
    const carCategories = [
      'COMPACT_SEDAN',
      'SUBCOMPACT_HATCH',
      'MEDIUM_CONVERTIBLE',
      'LARGE_SEDAN',
      'LARGE_SUV',
      'COMPACT_SPORTS',
      'COMPACT_VAN',
      'COMPACT_SUV'
    ];
    const motorcycleCategories = [
      'TOURING',
      'STREET',
      'SPORT',
      'CUSTOM',
      'QUAD_UTV',
      'NAKED',
      'CUB',
      'CARGO_TRICYCLE',
      'ATV_QUAD',
      'MOPED',
      'TRICYCLE',
      'TRAIL',
      'SCOOTER'
    ];
    const truckCategories = ['URBAN_TRUCK'];

    this.categories = this.selectedType === 0 ? carCategories
      : this.selectedType === 1 ? motorcycleCategories : truckCategories;
  }

  fetchVehicles(): void {
    this.errorMessage = null;
    const filters: VehicleFilterOptions = { type: this.selectedType ?? 0 };
    this.vehicleService.filterVehicles(filters).subscribe(
      (vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
        console.log(this.vehicles);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = `Erro ao buscar veículos: ${error.message}`;
      }
    );
  }
}
