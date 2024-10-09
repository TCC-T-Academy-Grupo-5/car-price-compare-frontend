import {Component, HostListener} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";
import {MenuService} from "@services/menu.service";
import {faBars} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'tcc-navbar-mobile',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink
  ],
  templateUrl: './navbar-mobile.component.html',
  styles: ``
})
export class NavbarMobileComponent {
  isMenuOpen: boolean;

  constructor(private menu: MenuService) {
    this.isMenuOpen = false;
  }

  toggleMenu(): void {
    this.menu.toggleMenu();
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.navbar') && this.menu.isMenuOpen) {
      this.menu.closeMenu();
    }
  }
  protected readonly faBars = faBars;
}
