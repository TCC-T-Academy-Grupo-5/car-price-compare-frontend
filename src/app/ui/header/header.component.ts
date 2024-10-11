import {Component} from '@angular/core';
import {NavbarComponent} from "@ui/navbar/navbar.component";
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {LanguageComponent} from "@ui/language/language.component";
import {ThemeComponent} from "@ui/theme/theme.component";
import {MatIconButton} from "@angular/material/button";
import {MatMenuPanel, MatMenuTrigger} from "@angular/material/menu";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {UserComponent} from "@ui/user/user.component";

@Component({
  selector: 'tcc-header',
  standalone: true,
  imports: [
    NavbarComponent,
    NgClass,
    RouterLink,
    LanguageComponent,
    ThemeComponent,
    MatIconButton,
    MatMenuTrigger,
    FaIconComponent,
    UserComponent
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  title: string = 'precificar';
  userMenu: MatMenuPanel | null = null;
  protected readonly faUser = faUser;
}
