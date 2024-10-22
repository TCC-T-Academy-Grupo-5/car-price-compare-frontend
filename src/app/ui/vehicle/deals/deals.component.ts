import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DealsService} from '@services/vehicle/deals.service';
import {Deal} from '@domain/vehicle/deal';
import {Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorService} from '@services/errors/error.service';
import {CommonModule} from '@angular/common';
import {DealComponent} from '@ui/vehicle/deals/deal/deal.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'tcc-deals',
  standalone: true,
  imports: [CommonModule, DealComponent, MatProgressSpinner, TranslateModule],
  templateUrl: './deals.component.html',
  host: {
    '[style.--mdc-circular-progress-active-indicator-color]': "'#009AFF'"
  }
})
export class DealsComponent implements OnInit, OnDestroy {
  @Input({required: true}) vehicleId = '';
  @Input({required: true}) latestFipePrice = 0;
  deals: Deal[] = [];
  relatedDeals: Deal[] = [];
  isLoading = true;

  dealsSubscription: Subscription | undefined;

  constructor(private dealsService: DealsService, private errorService: ErrorService) {
  }

  ngOnInit() {
    this.dealsSubscription = this.dealsService.getVehicleDeals(this.vehicleId).subscribe({
      next: (deals: Deal[]) => {
        this.isLoading = true;

        this.deals = [];

        deals.sort((a, b) => a.price - b.price);
        deals.forEach((deal: Deal) => {
          if (deal.isFullMatch) {
            this.calculatePriceDifference(deal);
            this.deals!.push(deal);
          } else {
            this.relatedDeals!.push(deal);
          }
        })

        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.errorService.handleError(error);
        console.error(error.message);
      }
    });
  }

  ngOnDestroy() {
    this.dealsSubscription?.unsubscribe();
  }

  private calculatePriceDifference(deal: Deal): void {
    const fipePriceDiff = deal.price - this.latestFipePrice;
    const fipePriceDiffPercentage = (fipePriceDiff / this.latestFipePrice) * 100;

    deal.fipePriceDiff = fipePriceDiff;
    deal.fipePriceDiffPercentage = fipePriceDiffPercentage;
  }
}
