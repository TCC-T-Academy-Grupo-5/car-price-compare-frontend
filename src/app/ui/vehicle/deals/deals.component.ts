import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DealsService} from '@services/vehicle/deals.service';
import {Deal} from '@domain/vehicle/deal';
import {Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorService} from '@services/errors/error.service';
import {VehicleDetails} from '@domain/vehicle/vehicledetails';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'tcc-deals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deals.component.html'
})
export class DealsComponent implements OnInit, OnDestroy {
  @Input({required: true}) vehicleDetails!: VehicleDetails | undefined;
  deals: Deal[] = [];
  relatedDeals: Deal[] = [];

  dealsSubscription: Subscription | undefined;

  constructor(private dealsService: DealsService, private errorService: ErrorService) {}

  ngOnInit() {
    if (this.vehicleDetails) {
      const vehicleId = this.vehicleDetails?.id as string;
      this.dealsSubscription = this.dealsService.getVehicleDeals(vehicleId).subscribe({
        next: (deals: Deal[]) => {
          deals.forEach((deal: Deal) => {
            if (deal.isFullMatch) {
              this.deals.push(deal);
            } else {
              this.relatedDeals.push(deal);
            }
          })

          console.log('deals ', this.deals)
          console.log('related deals ', this.relatedDeals)
        },
        error: (error: HttpErrorResponse) => {
          this.errorService.handleError(error);
          console.error(error.message);
        }
      });

    }
  }

  ngOnDestroy() {
    this.dealsSubscription?.unsubscribe();
  }
}
