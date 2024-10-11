import {Component, HostListener, OnInit} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {KeyValuePipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {LanguageService} from "@services/language.service";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {ItemsMap} from "@services/interfaces/ItemsMap";

@Component({
  selector: 'tcc-language',
  standalone: true,
  imports: [
    FaIconComponent,
    NgOptimizedImage,
    TranslateModule,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    NgForOf,
    KeyValuePipe
  ],
  templateUrl: './language.component.html',
  styles: ``
})
export class LanguageComponent implements OnInit {
  currentLang: string;
  dropdownOpen: boolean = false;
  languages!: ItemsMap;

  constructor(private languageService: LanguageService) {
    this.currentLang = this.languageService.initializeLanguageSettings();
  }

  ngOnInit(): void {
    this.languages = this.languageService.getAvailableLanguages();
    this.languageService.switchLang(this.currentLang);
  }

  switchLang(lang: string): void {
    if (lang) {
      this.languageService.switchLang(lang);
      this.currentLang = lang;
    }
  }

  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      (event.target as HTMLElement).click();
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.relative') && this.dropdownOpen) {
      this.closeDropdown();
    }
  }

  private closeDropdown(): void {
    this.dropdownOpen = false;
  }
}
