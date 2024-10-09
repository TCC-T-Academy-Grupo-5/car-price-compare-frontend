import {Component} from '@angular/core';
import {NavbarComponent} from "@ui/navbar/navbar.component";
import {NavbarMobileComponent} from "@ui/navbar-mobile/navbar-mobile.component";
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'tcc-header',
  standalone: true,
  imports: [
    NavbarComponent,
    NavbarMobileComponent,
    RouterLink,
    NgClass
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  title: string = 'precificar';
}
