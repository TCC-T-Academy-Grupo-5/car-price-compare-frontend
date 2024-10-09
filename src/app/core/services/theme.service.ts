import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themeKey: string = 'theme';

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.setThemeFromLocalStorage();
    }
  }

  toggleTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const currentTheme = this.getCurrentTheme();
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      localStorage.setItem(this.themeKey, newTheme);
    }
  }

  setThemeFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = localStorage.getItem(this.themeKey) || '';
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }

  getCurrentTheme(): string {
    if (isPlatformBrowser(this.platformId)) {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  }
}
