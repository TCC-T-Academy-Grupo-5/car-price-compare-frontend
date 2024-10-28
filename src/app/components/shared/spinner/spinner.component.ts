import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {TranslationsPipe} from '@pipes/translations.pipe';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'tcc-spinner',
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
    TranslationsPipe
  ],
  template: `
    <div *ngIf="loading; else content" class="w-10 h-10 border-4 border-tertiary-light border-t-highlight-light rounded-full animate-spin"></div>
    <ng-template #content>
      <div class="not-found bg-blue-500 bg-opacity-70 px-4 py-2 rounded flex items-center justify-center gap-1 w-full">
        <i class="material-symbols-outlined">info</i>
        <span class="font-[400] lowercase">{{ 'not_found' | translate | translations: object }}</span>
      </div>
    </ng-template>
  `
})
export class SpinnerComponent implements OnInit {
  @Input() object = 'item';
  loading = true;

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  }
}


