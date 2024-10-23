import {Component, Input} from '@angular/core';
import {Brand} from '@domain/vehicle/brand';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'tcc-filter-brand',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './filter-brand.component.html'
})
export class FilterBrandComponent {
  @Input({ required: true }) brands: Brand[] = [];
  @Input({ required: false }) vehicleType = 0;
}
