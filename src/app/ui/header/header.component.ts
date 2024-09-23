import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {faBalanceScale, faCar, faExclamationTriangle, faHeart, faUser} from "@fortawesome/free-solid-svg-icons";
import {OutsideClickDirective} from "../../core/directives/outside-click.directive";

@Component({
  selector: 'tcc-header',
  standalone: true,
  imports: [
    FaIconComponent,
    CommonModule,
    RouterModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    OutsideClickDirective,
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    console.log('Logout efetuado com sucesso.'); // TODO: lógica de logout.
  }

  protected readonly faCar = faCar;
  protected readonly faAlert = faExclamationTriangle;
  protected readonly faCompare = faBalanceScale;
  protected readonly faLiked = faHeart;
  protected readonly faUser = faUser;
}
