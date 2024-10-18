import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'tcc-filter-type',
  standalone: true,
  imports: [
    NgClass,
    TranslateModule
  ],
  templateUrl: './filter-type.component.html',
  styles: ``
})
export class FilterTypeComponent {
  @Input() selectedType = 0;
  @Output() typeSelected = new EventEmitter<number>();

  selectVehicleType(type: number): void {
    this.typeSelected.emit(type);
  }
}
