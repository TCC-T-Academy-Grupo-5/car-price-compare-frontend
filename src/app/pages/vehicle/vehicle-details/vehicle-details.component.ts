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
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {NotificationService} from '@services/user/notification.service';
import {NotificationRequest} from '@domain/vehicle/notification-request';
import {NotificationResponse} from '@domain/vehicle/notification-response';
import {SnackbarService} from '@services/SnackbarService';
import {AuthService} from '@services/auth.service';
import {PriceHistoryChartComponent} from '@ui/vehicle/price-history-chart/price-history-chart.component';
import { FavoriteService } from '@services/favorite.service';

@Component({
  selector: 'tcc-vehicle-details',
  standalone: true,
  imports: [CommonModule, MatTable, MatColumnDef, PriceHistoryTableComponent, DealsComponent, TranslateModule, PriceHistoryChartComponent],
  templateUrl: './vehicle-details.component.html'
})
export class VehicleDetailsComponent implements OnInit, OnDestroy {
  vehicleId = '';
  notificationId = '';
  favoriteId = '';
  vehicleDetails: VehicleDetails | undefined;
  latestFipePrice: FipePrice | undefined;
  isUserSubscribed: boolean | undefined;
  isUserLoggedIn: boolean | undefined;
  isFavorite = false;

  vehicleDetailsSubscription: Subscription | undefined;
  currentUserVehicleSubscription: Subscription | undefined;

  constructor(private vehicleDetailsService: VehicleDetailsService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private errorService: ErrorService,
              private snackbarService: SnackbarService,
              private authService: AuthService,
              private translateService: TranslateService,
              private favoriteService: FavoriteService) {
  }

  ngOnInit() {
    this.loadVehicleDetails();
    this.loadCurrentUserVehicleSubscription();
    this.validateUserLoggedIn();
    this.checkIfVehicleIsFavorite();
  }

  ngOnDestroy() {
    this.vehicleDetailsSubscription?.unsubscribe();
    this.currentUserVehicleSubscription?.unsubscribe();
  }

  onAlertClick() {
    if (!this.notificationId) {
      this.createNotification();
    } else {
      this.deleteNotification();
    }
  }

  private loadVehicleDetails() {
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
  }

  private loadCurrentUserVehicleSubscription() {
    this.currentUserVehicleSubscription = this.notificationService.isUserSubscribedToVehicle(this.vehicleId).subscribe({
      next: (response: {exists: boolean, notificationId?: string}) => {
        this.isUserSubscribed = response.exists;
        this.notificationId = response.notificationId ?? '';
      },
    })
  }

  private createNotification() {
    const notificationRequest: NotificationRequest = {
      notificationType: 1,
      currentFipePrice: this.latestFipePrice?.price ?? 0,
      vehicleId: this.vehicleId
    };
    this.notificationService.createNotification(notificationRequest).subscribe({
      next: (notificationResponse: NotificationResponse) => {
        this.isUserSubscribed = true;
        this.notificationId = notificationResponse.notificationId;
        this.translateService.get('vehicle.deals.create_alert.success').subscribe(
          (message: string) => this.snackbarService.open(message)
        )
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error creating notification for vehicle ', this.vehicleId, error.message);
        this.isUserSubscribed = false;
      }
    });
  }

  private deleteNotification() {
    this.notificationService.deleteNotification(this.notificationId).subscribe({
      next: () => {
        this.isUserSubscribed = false;
        this.notificationId = '';
      },
      error: (error: HttpErrorResponse) => console.error(error.message)
    });
  }

  private validateUserLoggedIn() {
    this.authService.isLoggedIn().subscribe({
      next: (isLoggedIn: boolean) => this.isUserLoggedIn = isLoggedIn,
    })
  }

  private checkIfVehicleIsFavorite() {
    this.favoriteService.getFavoriteByVehicleId(this.vehicleId).subscribe({
      next: (favoriteResponse: {id:string}) => {
        this.isFavorite = true;
        this.favoriteId = favoriteResponse.id;
      },
      error: () => this.isFavorite = false
    })
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;

    if(this.isFavorite) {
      this.favoriteService.addFavorite(this.vehicleId).subscribe(() => this.checkIfVehicleIsFavorite());
    } else
      this.favoriteService.removeFavorite(this.favoriteId).subscribe(() => this.favoriteId = '');
  }
}
