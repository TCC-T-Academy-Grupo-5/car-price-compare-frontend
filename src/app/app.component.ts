import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FooterComponent} from '@ui/footer/footer.component';
import {HeaderComponent} from '@ui/header/header.component';
import {HomeComponent} from '@pages/home/home.component';
import {UserComponent} from '@ui/user/user.component';
import {InteractionDirective} from '@directives/EventListenerDirectives';
import {VehiclesComponent} from '@pages/vehicles/vehicles.component';

@Component({
  selector: 'tcc-root',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    RouterOutlet,
    UserComponent,
    VehiclesComponent,
    InteractionDirective
  ],
  template: `
    <div class="flex flex-col min-h-screen">
      <tcc-header/>
      <main class="flex-grow bg-secondary-light dark:bg-secondary">
        <div class="container-responsive py-16 my-16 overflow-hidden">
          <router-outlet></router-outlet>
        </div>
      </main>
      <tcc-footer/>
    </div>
  `
})
export class AppComponent {}
