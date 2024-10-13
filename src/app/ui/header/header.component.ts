import {Component} from '@angular/core';
import {NavbarComponent} from "@ui/navbar/navbar.component";
import {NavbarMobileComponent} from "@ui/navbar-mobile/navbar-mobile.component";
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatMenuPanel, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'tcc-header',
  standalone: true,
  imports: [
    NavbarComponent,
    NavbarMobileComponent,
    NgClass,
    RouterLink,
    MatIconButton,
    MatMenuTrigger
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
