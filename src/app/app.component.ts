import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FaIconComponent, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FooterComponent} from "@ui/footer/footer.component";
import {NavbarComponent} from "@ui/navbar/navbar.component";
import {HeaderComponent} from "@ui/header/header.component";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'tcc-root',
  standalone: true,
  imports: [
    FaIconComponent,
    FooterComponent,
    NavbarComponent,
    RouterOutlet,
    HeaderComponent,
    FontAwesomeModule
  ],
  template: `<tcc-header/> <router-outlet/> <tcc-footer/>`
})
export class AppComponent {
  constructor() {
    library.add(fas);
  }
}
