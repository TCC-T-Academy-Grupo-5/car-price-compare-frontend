import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FooterComponent} from '@components/ui/footer/footer.component';
import {HeaderComponent} from '@components/ui/header/header.component';
import {HomeComponent} from '@components/pages/home/home.component';
import {UserComponent} from '@components/ui/user/user.component';
import {InteractionDirective} from '@directives/EventListenerDirectives';
import {VehiclesComponent} from '@components/pages/vehicles/vehicles.component';
import {ModelsComponent} from '@components/pages/models/models.component';
import {SpinnerComponent} from '@components/shared/spinner/spinner.component';

@Component({
  selector: 'tcc-root',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    ModelsComponent,
    RouterOutlet,
    SpinnerComponent,
    UserComponent,
    VehiclesComponent,
    InteractionDirective
  ],
  template: `
    <div class="flex flex-col min-h-screen">
      <tcc-header/>
      <main class="flex-grow bg-secondary-light dark:bg-secondary">
        <div class="container-responsive py-12 my-0 overflow-hidden">
          <router-outlet></router-outlet>
        </div>
      </main>
      <tcc-footer class="bg-secondary" />
    </div>
  `
})
export class AppComponent {}
