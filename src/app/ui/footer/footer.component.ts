import { Component } from '@angular/core';

@Component({
  selector: 'tcc-footer',
  standalone: true,
  imports: [
  ],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  navigateTo(url: string) {
    window.open(url, '_blank');
  }
}
