import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorService} from '@services/errors/error.service';
import {CommonModule} from '@angular/common';
import {Subscription} from 'rxjs';
import {FipePrice} from '@domain/vehicle/fipeprice';
import {VehicleDetailsService} from '@services/vehicle/vehicle-details.service';
import {VehicleDetails} from '@domain/vehicle/vehicledetails';
import {MatColumnDef, MatTable} from '@angular/material/table';
import {PriceHistoryTableComponent} from '@ui/vehicle/price-history-table/price-history-table.component';

@Component({
  selector: 'tcc-vehicle-details',
  standalone: true,
  imports: [CommonModule, MatTable, MatColumnDef, PriceHistoryTableComponent],
  templateUrl: './vehicle-details.component.html'
})
export class VehicleDetailsComponent implements OnInit, OnDestroy {
  vehicleDetails: VehicleDetails | undefined;
  latestFipePrice: FipePrice | undefined;

  vehicleDetailsSubscription: Subscription | undefined;

  constructor(private vehicleDetailsService: VehicleDetailsService,
              private activatedRoute: ActivatedRoute,
              private errorService: ErrorService) {}

  ngOnInit() {
     const vehicleId = this.activatedRoute.snapshot.params['vehicleId'];
     this.vehicleDetailsSubscription = this.vehicleDetailsService.getVehicleById(vehicleId).subscribe({
       next: (vehicleDetails: VehicleDetails) => {
         this.vehicleDetails = vehicleDetails;
         this.latestFipePrice = vehicleDetails.fipePrices.at(0);
       },
       error: (error: HttpErrorResponse) => {
         this.errorService.handleError(error);
         console.error(error.message);
       }
     });
  }

  ngOnDestroy() {
      this.vehicleDetailsSubscription?.unsubscribe();
  }
}
