import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FaIconComponent, FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {ThemeService} from "./services/theme.service";
import {HeaderComponent} from "@ui/header/header.component";
import {FooterComponent} from "@ui/footer/footer.component";
import {faBalanceScale,faCar,faExclamationTriangle,faHeart,faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tcc-root',
  standalone: true,
  imports: [
    FaIconComponent,
    FooterComponent,
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Car Price Compare'; // TODO: i18n
  isDropdownOpen = false;
  constructor(
    private icon: FaIconLibrary,
    private themeService: ThemeService
  ) {
    this.initializeIcons();
  }

  private initializeIcons(): void {
    this.icon.addIconPacks(fas);
    this.icon.addIcons(faCar, faExclamationTriangle, faBalanceScale, faHeart, faUser);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    // TODO!!!
  }
}
