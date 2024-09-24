import {Component, OnInit} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {faBalanceScale, faCar, faExclamationTriangle, faHeart, faUser} from "@fortawesome/free-solid-svg-icons";
import {OutsideClickDirective} from "../../core/directives/outside-click.directive";
import {ThemeService} from "../../services/theme.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

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
    TranslateModule,
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;
  currentTheme: string | null = '';
  themeIcon: string = 'sun';

  constructor(
      private themeService: ThemeService,
      private translateService: TranslateService
  ) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit(): void {
    this.setInitialTheme();
  }

  setInitialTheme(): void {
    this.currentTheme = this.themeService.getCurrentTheme();
    console.log('Initial theme from service:', this.currentTheme);

    if (!this.currentTheme) {
      this.currentTheme = 'light';
      this.themeService.toggleTheme();
    }
    this.updateThemeIcon();
  }

  logout() {
    console.log('Logout efetuado com sucesso.'); // TODO: lógica de logout.
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.currentTheme = this.themeService.getCurrentTheme();
    this.updateThemeIcon();
  }

  updateThemeIcon(): void {
    if (this.currentTheme) this.themeIcon = this.currentTheme == 'dark' ? 'sun' : 'moon';
  }

  switchLang(lang: string): void {
    this.translateService.use(lang);
    localStorage.setItem("lang", lang);
  }

  protected readonly faCar = faCar;
  protected readonly faAlert = faExclamationTriangle;
  protected readonly faCompare = faBalanceScale;
  protected readonly faLiked = faHeart;
  protected readonly faUser = faUser;
}
