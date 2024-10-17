import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {DatePipe, NgClass} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatMenuTrigger} from "@angular/material/menu";
import {LanguageComponent} from "@ui/language/language.component";
import {ThemeComponent} from "@ui/theme/theme.component";
import {UserComponent} from "@ui/user/user.component";
import {MatTab, MatTabContent, MatTabGroup} from "@angular/material/tabs";
import {HomeComponent} from "@pages/home/home.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {NavbarComponent} from "@ui/navbar/navbar.component";
import {InteractionDirective} from '@directives/EventListenerDirectives';
import {ErrorService} from '@services/errors/error.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'tcc-header',
  standalone: true,
  imports: [
    DatePipe,
    HomeComponent,
    InteractionDirective,
    LanguageComponent,
    MatIcon,
    MatIconButton,
    MatMenuTrigger,
    MatTab,
    MatTabGroup,
    MatToolbar,
    MatTabContent,
    NavbarComponent,
    NgClass,
    RouterLink,
    ThemeComponent,
    UserComponent
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isOpen = false;

  constructor(private e: ErrorService) {}

  simulateError(status: number): void {
    const error = new HttpErrorResponse({
      status,
      statusText: 'Simulated Error',
      url: '/fake-url'
    });

    this.e.handleError(error).subscribe({
      error: (err) => console.error('Error handled:', err)
    });
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }
}
