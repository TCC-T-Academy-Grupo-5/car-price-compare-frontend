import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faBalanceScale,
  faCar,
  faExclamationTriangle,
  faHeart,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { OutsideClickDirective } from '../../directives/outside-click.directive';

@Component({
  selector: 'app-header',
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
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  faCar = faCar;
  faAlert = faExclamationTriangle;
  faCompare = faBalanceScale;
  faLiked = faHeart;
  faUser = faUser;

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    console.log('Logout efetuado');
  }
}
