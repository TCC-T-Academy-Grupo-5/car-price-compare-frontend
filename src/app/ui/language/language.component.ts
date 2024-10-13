import {Component, HostListener, OnInit} from '@angular/core';
import {ItemsMap} from "@services/interfaces/items-map";
import {LanguageService} from "@services/language.service";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {KeyValuePipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'tcc-language',
  standalone: true,
  imports: [
    MatMenu,
    MatMenuItem,
    KeyValuePipe,
    MatMenuTrigger,
    NgOptimizedImage,
    TranslateModule,
    NgForOf
  ],
  template: `
    <mat-menu #languageMenu="matMenu">
      <button mat-menu-item *ngFor="let lang of languages | keyvalue" (click)="switchLang(lang.key)">
        {{ lang.value | translate }}
      </button>
    </mat-menu>

    <i
      mat-button
      [matMenuTriggerFor]="languageMenu"
      aria-label="Language Menu"
      class="material-symbols-outlined open-dropdown"
      tabindex="0"
      (keyup)="handleKeyboardEvent($event)"
    >
      language
    </i>
  `,
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
