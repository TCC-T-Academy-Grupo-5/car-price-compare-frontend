import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FaIconComponent, FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {ThemeService} from "./services/theme.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FaIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'Car Price Compare'; // TODO: i18n
  constructor(library: FaIconLibrary, private themeService: ThemeService) {
    library.addIconPacks(fas);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
