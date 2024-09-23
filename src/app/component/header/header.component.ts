import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faBalanceScale,
  faCar,
  faExclamationTriangle,
  faHeart,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FaIconComponent, CommonModule, RouterModule, MatSidenavModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  faCar = faCar;
  faAlert = faExclamationTriangle;
  faCompare = faBalanceScale;
  faLiked = faHeart;
  faUser = faUser;
}
