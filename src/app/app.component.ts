import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FaIconComponent, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FooterComponent} from "@ui/footer/footer.component";
import {NavbarComponent} from "@ui/navbar/navbar.component";
import {HeaderComponent} from "@ui/header/header.component";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {HomeComponent} from "@pages/home/home.component";
import {UserComponent} from "@ui/user/user.component";

@Component({
  selector: 'tcc-root',
  standalone: true,
  imports: [
    FaIconComponent,
    FontAwesomeModule,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    NavbarComponent,
    RouterOutlet,
    UserComponent
  ],
  template: `
    <div class="flex flex-col min-h-screen">
      <tcc-header/>
      <main class="flex-grow">
        <router-outlet/>
        <fa-icon [icon]="['fas', 'home']" size="lg" />AAAAA
        <fa-icon [icon]="['fas', 'magnifying-glass']" />
      </main>
      <tcc-footer/>
    </div>
  `
})
export class AppComponent {
  constructor() {
    library.add(fas);
  }
}
