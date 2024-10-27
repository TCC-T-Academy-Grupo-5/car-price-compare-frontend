import {Component, Input, OnInit} from '@angular/core';
import {CurrencyPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {TranslationsPipe} from '@pipes/translations.pipe';

@Component({
  selector: 'tcc-skeleton-loader',
  standalone: true,
  imports: [
    NgIf,
    CurrencyPipe,
    NgClass,
    NgForOf,
    TranslateModule,
    TranslationsPipe
  ],
  templateUrl: './skeleton-loader.html',
  styles: ``
})
export class SkeletonLoaderComponent implements OnInit {
  @Input() count! : number;
  @Input() showAnimation = true;
  loading = true;
  object = 'item';

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
}
