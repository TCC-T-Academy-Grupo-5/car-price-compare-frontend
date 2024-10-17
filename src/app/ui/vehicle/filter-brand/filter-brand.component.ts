import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Brand} from '@models/brand';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'tcc-filter-brand',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
  ],
  templateUrl: './filter-brand.component.html'
})
export class FilterBrandComponent {
  @Input({required: true}) brands: Brand[] = [];
  @Output() brandSelected = new EventEmitter<string>();

  onSelectBrand(brandId: string) {
    this.brandSelected.emit(brandId);
  }
}
