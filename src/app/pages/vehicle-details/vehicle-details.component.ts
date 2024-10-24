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
import {DealsComponent} from '@ui/vehicle/deals/deals.component';
import {TranslateModule} from '@ngx-translate/core';
import {NotificationService} from '@services/user/notification.service';

@Component({
  selector: 'tcc-vehicle-details',
  standalone: true,
  imports: [CommonModule, MatTable, MatColumnDef, PriceHistoryTableComponent, DealsComponent, TranslateModule],
  templateUrl: './vehicle-details.component.html'
})
export class VehicleDetailsComponent implements OnInit, OnDestroy {
  vehicleId = '';
  vehicleDetails: VehicleDetails | undefined;
  latestFipePrice: FipePrice | undefined;
  alertDisabled = false;

  vehicleDetailsSubscription: Subscription | undefined;

  constructor(private vehicleDetailsService: VehicleDetailsService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private errorService: ErrorService) {}

  ngOnInit() {
     this.vehicleId = this.activatedRoute.snapshot.params['vehicleId'];
     this.vehicleDetailsSubscription = this.vehicleDetailsService.getVehicleById(this.vehicleId).subscribe({
       next: (vehicleDetails: VehicleDetails) => {
         this.vehicleDetails = vehicleDetails;
         this.latestFipePrice = vehicleDetails.fipePrices.at(0);
       },
       error: (error: HttpErrorResponse) => {
         this.errorService.handleError(error);
         console.error(error.message);
       }
     });

     this.notificationService.getNotificationsObservable().subscribe({
       next: (notifications: string[]) => this.alertDisabled = notifications.includes(this.vehicleId),
       error: (error: HttpErrorResponse) => console.error(error.message),
     })
  }

  ngOnDestroy() {
      this.vehicleDetailsSubscription?.unsubscribe();
  }

  onAlertClick() {
    this.notificationService.createNotification(this.vehicleId);
  }

  protected readonly alert = alert;
}
