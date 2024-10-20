import {Component, Input} from '@angular/core';
import {Brand} from '@domain/vehicle/brand';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from "@angular/router";

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
  @Input({required: true}) brands: Brand[] = [];

  constructor(private router: Router) {}

  onSelectBrand(brandName: string): void {
    console.log("Direcionar para nova rota, " + brandName);
    this.router.navigate(['models', brandName]).then(r => console.log('redirect', r));
  }
}
