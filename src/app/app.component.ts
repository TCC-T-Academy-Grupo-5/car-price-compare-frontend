import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FaIconComponent, FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {HeaderComponent} from "@ui/header/header.component";
import {FooterComponent} from "@ui/footer/footer.component";
import {ThemeService} from "@services/theme.service";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'tcc-root',
  standalone: true,
  imports: [
    FaIconComponent,
    FooterComponent,
    HeaderComponent,
    MatMenuModule,
    MatButtonModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Vehicle Price Compare';
  isDropdownOpen = false;
  constructor(
    private icon: FaIconLibrary,
    private themeService: ThemeService
  ) {
    this.icon.addIconPacks(fas);
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
