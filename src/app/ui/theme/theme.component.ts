import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {FaIconComponent, IconDefinition} from "@fortawesome/angular-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import {ThemeService} from "@services/theme.service";

@Component({
  selector: 'tcc-theme',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './theme.component.html',
  styles: ``
})
export class ThemeComponent implements OnInit {
  themeIcon: IconDefinition = faMoon;
  switchTheme!: string;

  private readonly switchTo = 'Trocar tema para'; // TODO: translate

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    this.updateTheme(this.themeService.getCurrentTheme());
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.updateTheme(this.themeService.getCurrentTheme());
  }

  private updateTheme(theme: string = 'light'): void {
    this.themeIcon = theme === 'dark' ? faSun : faMoon;
    this.switchTheme = theme === 'dark' ? `${this.switchTo} claro` : `${this.switchTo} escuro`;
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target as HTMLElement;
      target.click();
    }
  }
}
