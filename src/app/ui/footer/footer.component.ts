import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'tcc-footer',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  navigateTo(url: string) {
    window.open(url, '_blank');
  }
}
