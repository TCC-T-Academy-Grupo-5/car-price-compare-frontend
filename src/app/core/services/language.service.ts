import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ItemsMap} from "@services/types/items-map";
import {TranslateService} from "@ngx-translate/core";
import {DOCUMENT, isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLang: string;
  private readonly defaultLang = 'pt';
  private readonly langLocalStorageKey = 'lang';
  private languages: ItemsMap = {
    en: 'languages.en',
    pt: 'languages.pt',
    de: 'languages.de',
    es: 'languages.es',
  };

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.currentLang = this.initializeLanguageSettings();
  }

  initializeLanguageSettings(): string {
    let savedLang: string | null = null;
    if (this.isBrowser()) {
      savedLang = localStorage.getItem(this.langLocalStorageKey);
    }
    const browserLang: string = this.isBrowser() ? navigator.language.split('-')[0] : this.defaultLang;
    const languages: string[] = Object.keys(this.languages);
    return savedLang && languages.includes(savedLang) ? savedLang
      : (languages.includes(browserLang) ? browserLang : this.defaultLang);
  }


  switchLang(lang: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.langLocalStorageKey, lang);
    }
    this.translate.use(lang);
    this.updateHtmlLangAttribute(lang);
  }

  getAvailableLanguages(): ItemsMap {
    return this.languages;
  }

  private updateHtmlLangAttribute(lang: string): void {
    if (this.isBrowser()) {
      this.document.documentElement.setAttribute('lang', lang);
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
