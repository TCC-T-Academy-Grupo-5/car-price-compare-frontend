import {Component, OnDestroy, OnInit} from '@angular/core';
import {VehicleService} from '@services/vehicle.service';
import {ActivatedRoute} from '@angular/router';
import {Vehicle} from '@models/vehicle';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorService} from '@services/errors/error.service';
import {CommonModule} from '@angular/common';
import {Subscription} from 'rxjs';
import {FipePrice} from '@models/fipeprice';

@Component({
  selector: 'tcc-version-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-details.component.html'
})
export class VehicleDetailsComponent implements OnInit, OnDestroy {
  vehicle: Vehicle | undefined;
  latestFipePrice: FipePrice | undefined;

  vehicleSubscription: Subscription | undefined;

  constructor(private vehicleService: VehicleService, private activatedRoute: ActivatedRoute, private errorService: ErrorService) {}

  ngOnInit() {
     const vehicleId = this.activatedRoute.snapshot.params['vehicleId'];
     this.vehicleSubscription = this.vehicleService.getVehicleById(vehicleId).subscribe({
       next: (vehicle: Vehicle) => {
         this.vehicle = vehicle;
         this.latestFipePrice = vehicle.fipePrices.at(0);
       },
       error: (error: HttpErrorResponse) => {
         this.errorService.handleError(error);
         console.error(error.message);
       }
     });
  }

  ngOnDestroy() {
      this.vehicleSubscription?.unsubscribe();
  }
}
