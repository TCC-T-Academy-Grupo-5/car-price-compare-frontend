import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FooterComponent} from '@ui/footer/footer.component';
import {HeaderComponent} from '@ui/header/header.component';
import {HomeComponent} from '@pages/home/home.component';
import {UserComponent} from '@ui/user/user.component';
import {InteractionService} from '@services/interaction.service';
import {VehicleComponent} from '@pages/vehicle/vehicle.component';

@Component({
  selector: 'tcc-root',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    RouterOutlet,
    UserComponent,
    VehicleComponent
  ],
  template: `
    <div class="flex flex-col min-h-screen">
      <tcc-header/>
      <main class="flex-grow">
        <router-outlet/>
      </main>
      <tcc-footer/>
    </div>
  `
})
export class AppComponent {
  constructor(private interaction: InteractionService) {}
  title = 'car-price-compare-frontend';


  get isOpen(): boolean {
    return this.interaction.isMenuOpen;
  }

  toggleMenu(): void {
    this.interaction.toggleMenu();
  }

  closeMenu(): void {
    this.interaction.closeMenu();
  }
}
