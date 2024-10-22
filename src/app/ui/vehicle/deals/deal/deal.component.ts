import {Component, Input} from '@angular/core';
import {Deal} from '@domain/vehicle/deal';
import {CommonModule, CurrencyPipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'tcc-deal',
  standalone: true,
  imports: [
    CurrencyPipe,
    DecimalPipe,
    CommonModule
  ],
  templateUrl: './deal.component.html'
})
export class DealComponent {
  @Input({required: true}) deal!: Deal;
  protected readonly Math = Math;
}
