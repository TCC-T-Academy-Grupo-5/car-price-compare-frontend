import {Component, HostListener, Inject, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import {DOCUMENT, isPlatformBrowser, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {filter} from "rxjs";
import {faMoon, faSun, faUser} from "@fortawesome/free-solid-svg-icons";
import {ThemeService} from "@services/theme.service";
import {FaIconComponent, IconDefinition} from "@fortawesome/angular-fontawesome";
import {Languages} from "@services/interfaces/languages";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'tcc-navbar',
  standalone: true,
  imports: [
    NgClass,
    FaIconComponent,
    MatMenu,
    TranslateModule,
    MatMenuItem,
    NgIf,
    NgForOf,
    MatMenuTrigger,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent implements OnInit {
  title: string = 'AutoValue';
  themeIcon: IconDefinition = faMoon;
  switchTheme!: string;
  currentRoute: string = '';
  activeClass: string = "border-b-2 transform transition duration-500 ease-in-out";
  inactiveClass: string = "hover:border-b-2 border-av-highlight-light dark:border-av-highlight hover:transform transition duration-700";
  currentLang: string;
  // isDropdownOpen: boolean = false;
  dropdownOpen: boolean = false;

  languages: Languages = {
    en: 'languages.en',
    pt: 'languages.pt',
    de: 'languages.de',
    es: 'languages.es',
  };
  private readonly defaultLang = 'pt';
  private readonly langLocalStorageKey = 'lang';

  constructor(
    private router: Router,
    private translate: TranslateService,
    private theme: ThemeService,
    @Inject(PLATFORM_ID) private platformId: object,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.currentLang = this.initializeLanguageSettings();
  }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects
    });
    this.setInitialTheme();
    this.switchLang(this.currentLang);
  }

  isActive(route: string): string {
    let isRoute: boolean = this.currentRoute === route;
    return isRoute ? this.activeClass : this.inactiveClass;
  }


  switchLang(lang: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.langLocalStorageKey, lang);
    }
    this.translate.use(lang);
    this.currentLang = lang;
    this.updateHtmlLangAttribute(lang);
  }

  updateHtmlLangAttribute(lang: string): void {
    this.renderer.setAttribute(this.document.documentElement, 'lang', lang);
  }

  toggleTheme(): void {
    this.theme.toggleTheme();
    this.updateTheme(this.theme.getCurrentTheme());
  }

  objectKeys(languages: Languages) {
    return Object.keys(languages);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target as HTMLElement;
      target.click();
    }
  }

  logout(): void {
    this.router.navigate(['/']).then((): void => this.closeDropdown());
  }

  private closeDropdown(): void {
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.relative') && this.dropdownOpen) {
      this.closeDropdown();
    }
  }

  private initializeLanguageSettings(): string {
    if (this.isBrowser()) {
      const browserLang = navigator.language.split('-')[0];
      const savedLang = localStorage.getItem(this.langLocalStorageKey);
      const languages = Object.keys(this.languages);
      return savedLang || (languages.includes(browserLang) ? browserLang : this.defaultLang);
    }
    return this.defaultLang;
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private setInitialTheme(): void {
    this.updateTheme(this.theme.getCurrentTheme());
  }

  private updateTheme(theme: string = 'light'): void {
    const switchTo = 'Trocar tema para'; // TODO translate
    this.themeIcon = theme === 'dark' ? faSun : faMoon;
    this.switchTheme = theme === 'dark' ? `${switchTo} claro` : `${switchTo} escuro`
  }

  // protected readonly faAlert = faExclamationTriangle;
  // protected readonly faCompare = faBalanceScale;
  // protected readonly faLiked = faHeart;
  protected readonly faUser = faUser;
}
