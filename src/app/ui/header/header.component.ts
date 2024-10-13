import {Component} from '@angular/core';
import {NavbarComponent} from "@ui/navbar/navbar.component";
import {NavbarMobileComponent} from "@ui/navbar-mobile/navbar-mobile.component";
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatMenuTrigger} from "@angular/material/menu";
import {LanguageComponent} from "@ui/language/language.component";
import {ThemeComponent} from "@ui/theme/theme.component";
import {UserComponent} from "@ui/user/user.component";

@Component({
  selector: 'tcc-header',
  standalone: true,
  imports: [
    LanguageComponent,
    MatIconButton,
    MatMenuTrigger,
    NavbarComponent,
    NavbarMobileComponent,
    NgClass,
    RouterLink,
    ThemeComponent,
    UserComponent
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  // get userMenu(): MatMenuPanel | null {
  //   return this._userMenu;
  // }

  // set userMenu(value: MatMenuPanel | null) {
  //   this._userMenu = value;
  // }
  // title: string = 'precificar';
  // protected _userMenu: MatMenuPanel | null;
}
