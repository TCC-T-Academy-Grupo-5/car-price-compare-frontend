import {Component, Inject, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import {FaIconComponent, IconDefinition} from "@fortawesome/angular-fontawesome";
import {CommonModule, DOCUMENT, isPlatformBrowser, NgOptimizedImage} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {
  faBalanceScale, faCar, faExclamationTriangle, faHeart, faMoon, faSun, faUser
} from "@fortawesome/free-solid-svg-icons";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ThemeService} from "@services/theme.service";
import {OutsideClickDirective} from "@directives/outside-click.directive";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

interface Languages {
  [key: string]: string;
}

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
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    NgOptimizedImage,
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  currentLang: string;
  isDropdownOpen = false;
  languages: Languages = {
    en: 'languages.en',
    pt: 'languages.pt',
    de: 'languages.de',
    es: 'languages.es',
  };
  themeIcon: IconDefinition = faSun;
  private readonly defaultLang = 'pt';
  private readonly langLocalStorageKey = 'lang';

  constructor(
    private themeService: ThemeService,
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.currentLang = this.initializeLanguageSettings();
  }

  ngOnInit(): void {
    this.setInitialTheme();
    this.switchLang(this.currentLang);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  setInitialTheme(): void {
    this.updateThemeIcon(this.themeService.getCurrentTheme());
    console.log('Initial theme from service:', this.themeIcon);
    if (!this.themeIcon) {
      this.updateThemeIcon('light');
      this.themeService.toggleTheme();
    }
  }

  logout(): void {
    console.log('Logout efetuado com sucesso.'); // TODO: lógica de logout.
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.updateThemeIcon(this.themeService.getCurrentTheme());
  }

  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target as HTMLElement;
      target.click();
    }
  }

  switchLang(lang: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.langLocalStorageKey, lang);
    }
    this.translateService.use(lang);
    this.currentLang = lang;
    this.updateHtmlLangAttribute(lang);
  }

  updateHtmlLangAttribute(lang: string): void {
    this.renderer.setAttribute(this.document.documentElement, 'lang', lang);
  }

  private updateThemeIcon(theme: string | null): void {
    this.themeIcon = (theme === 'dark') ? faMoon : faSun;
  }

  private initializeLanguageSettings(): string {
    if (this.isBrowser()) {
      const browserLang = navigator.language.split('-')[0];
      const savedLang = localStorage.getItem(this.langLocalStorageKey);
      const supportedLangs = Object.keys(this.languages);
      return savedLang || (supportedLangs.includes(browserLang) ? browserLang : this.defaultLang);
    }
    return this.defaultLang;
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  protected readonly faCar = faCar;
  protected readonly faAlert = faExclamationTriangle;
  protected readonly faCompare = faBalanceScale;
  protected readonly faLiked = faHeart;
  protected readonly faUser = faUser;
}
