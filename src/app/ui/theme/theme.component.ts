import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ThemeService} from "@services/theme.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'tcc-theme',
  standalone: true,
  imports: [],
  template: `
    <i tabindex="0"
       (click)="toggleTheme()"
       (keyup)="handleKeyboardEvent($event)"
       title="{{ switchTheme }}"
       class="material-symbols-outlined">
       {{ themeIcon }}
    </i>
  `,
  styles: ``
})
export class ThemeComponent implements OnInit {
  themeIcon = 'dark_mode';
  switchTheme!: string;

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: object,
    private t: TranslateService
  ) {}

  ngOnInit(): void {
    this.updateTheme(this.themeService.getCurrentTheme());
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.updateTheme(this.themeService.getCurrentTheme());
  }

  private updateTheme(theme = 'light'): void {
    this.themeIcon = theme === 'dark' ? 'light_mode' : 'dark_mode';

    const translationKey = 'switch_theme_to';
    this.t.get(translationKey, { theme: this.t.instant(theme === 'dark' ? 'light' : 'dark') }).subscribe((translation: string) => {
      this.switchTheme = translation;
    });
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target as HTMLElement;
      target.click();
    }
  }
}
