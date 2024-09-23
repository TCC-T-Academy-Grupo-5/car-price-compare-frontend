import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas, faUser } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from './services/theme.service';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { OutsideClickDirective } from './directives/outside-click.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FaIconComponent,
    HeaderComponent,
    FooterComponent,
    MatSidenavModule,
    MatButtonModule,
    OutsideClickDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Car Price Compare'; // TODO: i18n

  faUser = faUser;
  constructor(library: FaIconLibrary, private themeService: ThemeService) {
    library.addIconPacks(fas);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
