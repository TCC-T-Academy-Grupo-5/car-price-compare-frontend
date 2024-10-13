import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FaIconComponent, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FooterComponent} from "@ui/footer/footer.component";
import {HeaderComponent} from "@ui/header/header.component";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {HomeComponent} from "@pages/home/home.component";

@Component({
  selector: 'tcc-root',
  standalone: true,
  imports: [
    FaIconComponent,
    FontAwesomeModule,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    RouterOutlet
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
}
