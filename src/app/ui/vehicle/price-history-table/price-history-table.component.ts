import {Component, Input} from '@angular/core';
import {FipePrice} from '@domain/vehicle/fipeprice';
import {CommonModule, CurrencyPipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'tcc-price-history-table',
  standalone: true,
  imports: [
    CurrencyPipe,
    DecimalPipe,
    CommonModule
  ],
  templateUrl: './price-history-table.component.html'
})
export class PriceHistoryTableComponent {
  @Input({required: true}) fipePrices: FipePrice[] = [];
  protected readonly Math = Math;

  getPriceDiffIconName(priceDiff: number): string {
    if (priceDiff > 0) {
      return 'trending_up';
    } else if (priceDiff < 0) {
      return 'trending_down';
    } else {
      return 'trending_flat';
    }
  }
}
