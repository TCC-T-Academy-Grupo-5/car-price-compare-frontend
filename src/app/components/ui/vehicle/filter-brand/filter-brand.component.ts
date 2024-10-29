import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Brand} from '@domain/vehicle/brand';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from "@angular/router";
import {SpinnerComponent} from '@components/shared/spinner/spinner.component';
import {SkeletonLoaderComponent} from '@components/shared/skeleton-loader/skeleton-loader';

@Component({
  selector: 'tcc-filter-brand',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    RouterLink,
    SpinnerComponent,
    SkeletonLoaderComponent,
  ],
  templateUrl: './filter-brand.component.html'
})
export class FilterBrandComponent {
  @Input({ required: true }) brands: Brand[] = [];
  @Input() filters!: { vehicleType: number; pageNumber: number; pageSize: number };
  @Output() loadNotPopular = new EventEmitter<void>();
  @Input({ required: true }) showLoadMore = true;

  onLoadNotPopular() {
    this.loadNotPopular.emit();
    this.showLoadMore = false;
  }
}
