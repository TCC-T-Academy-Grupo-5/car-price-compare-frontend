import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {CommonModule, DatePipe, NgClass} from "@angular/common";
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
import { NotificationComponent } from "../notification/notification.component";
import { AuthService } from '@services/auth.service';

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
    UserComponent,
    NotificationComponent,
    CommonModule
],
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  isOpen = false;
  isLoggedIn = false;

  constructor (private authService: AuthService){}

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if (token) {
      this.authService.validateToken(token).subscribe(data => {
        if (data) this.isLoggedIn = true;
        else localStorage.removeItem("token");
      })
    } else {
      this.isLoggedIn = false;
    }

    this.authService.isLoggedIn().subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }
}
