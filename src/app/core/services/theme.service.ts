import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject, Observable} from 'rxjs';

enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themeKey: string = 'theme';
  private currentThemeSubject: BehaviorSubject<Theme> | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.setThemeFromLocalStorage();
    }

    this.currentThemeSubject = new BehaviorSubject<Theme>(this.getCurrentTheme());
  }

  toggleTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const newTheme = this.getCurrentTheme() === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
      this.applyTheme(newTheme);
      localStorage.setItem(this.themeKey, newTheme);
      this.currentThemeSubject?.next(newTheme);
    }

  }

  setThemeFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = localStorage.getItem(this.themeKey) as Theme || Theme.LIGHT;
      this.applyTheme(storedTheme === Theme.DARK ? Theme.DARK : Theme.LIGHT);
    }
  }

  getCurrentTheme(): Theme {
    if (isPlatformBrowser(this.platformId)) {
      return document.documentElement.classList.contains('dark') ? Theme.DARK : Theme.LIGHT;
    }
    return Theme.LIGHT;
  }

  getCurrentThemeObservable(): Observable<Theme> {
    return this.currentThemeSubject!.asObservable();
  }

  private applyTheme(theme: Theme): void {
    document.documentElement.classList.toggle('dark', theme === Theme.DARK);
    this.updateAngularMaterialTheme(theme);
  }

  private updateAngularMaterialTheme(theme: Theme): void {
    const classList = document.body.classList;
    if (theme === Theme.DARK) {
      this.toggleClassList(classList, true);
    } else {
      this.toggleClassList(classList, false);
    }
  }

  private toggleClassList(classList: DOMTokenList, isDark: boolean): void {
    classList.toggle('mat-app-background', isDark);
    classList.toggle('mat-theme-dark', isDark);
  }
}
