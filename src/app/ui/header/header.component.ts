import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavbarComponent} from "@ui/navbar/navbar.component";
import {NavbarMobileComponent} from "@ui/navbar-mobile/navbar-mobile.component";
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
    UserComponent,
    MatTabGroup,
    MatTab,
    MatTabContent,
    DatePipe,
    HomeComponent,
    MatToolbar,
    MatIcon
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  @ViewChild('section2') section2!: ElementRef;
  @ViewChild('section3') section3!: ElementRef;

  scrollToSection(section: ElementRef) {
    section.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}
