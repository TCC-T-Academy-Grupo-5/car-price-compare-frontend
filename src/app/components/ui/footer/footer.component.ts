import { Component } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'tcc-footer',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  navigateTo(url: string) {
    window.open(url, '_blank');
  }
}
