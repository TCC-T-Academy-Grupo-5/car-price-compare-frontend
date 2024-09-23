import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly themeKey: string = 'data-theme';

    constructor(@Inject(PLATFORM_ID) private platformId: object) {
        if (isPlatformBrowser(this.platformId)) {
            this.setThemeFromLocalStorage();
        }
    }

    toggleTheme(): void {
        if (isPlatformBrowser(this.platformId)) {
            const currentTheme: string = document.documentElement.getAttribute(this.themeKey) || 'light';
            const newTheme: string = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute(this.themeKey, newTheme);
            localStorage.setItem(this.themeKey, newTheme);
        }
    }

    setThemeFromLocalStorage(): void {
        if (isPlatformBrowser(this.platformId)) {
            const storedTheme: string = localStorage.getItem(this.themeKey) || 'light';
            document.documentElement.setAttribute(this.themeKey, storedTheme);

            if (!localStorage.getItem(this.themeKey)) {
                const prefersDark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const defaultTheme: string = prefersDark ? 'dark' : 'light';
                document.documentElement.setAttribute(this.themeKey, defaultTheme);
                localStorage.setItem(this.themeKey, defaultTheme);
            }
        }
    }
}
