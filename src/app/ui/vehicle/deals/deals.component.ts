import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DealsService} from '@services/vehicle/deals.service';
import {Deal} from '@domain/vehicle/deal';
import {Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorService} from '@services/errors/error.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'tcc-deals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deals.component.html'
})
export class DealsComponent implements OnInit, OnDestroy {
  @Input({required: true}) vehicleId = '';
  @Input({required: true}) latestFipePrice: number = 0;
  deals: Deal[] = [];
  relatedDeals: Deal[] = [];

  dealsSubscription: Subscription | undefined;

  constructor(private dealsService: DealsService, private errorService: ErrorService) {
  }

  ngOnInit() {
    this.dealsSubscription = this.dealsService.getVehicleDeals(this.vehicleId).subscribe({
      next: (deals: Deal[]) => {
        deals.sort((a, b) => a.price - b.price);
        deals.forEach((deal: Deal) => {
          if (deal.isFullMatch) {
            this.deals.push(deal);
          } else {
            this.relatedDeals.push(deal);
          }

          const fipePriceDiff = deal.price - this.latestFipePrice;
          const fipePriceDiffPercentage = (fipePriceDiff / this.latestFipePrice) * 100;

          deal.fipePriceDiff = fipePriceDiff;
          deal.fipePriceDiffPercentage = fipePriceDiffPercentage;
        })
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

  protected readonly Math = Math;
}
