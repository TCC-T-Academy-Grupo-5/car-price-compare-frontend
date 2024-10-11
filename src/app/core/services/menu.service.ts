import {HostListener, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuStates: { [key: string]: boolean } = {};

  toggleMenu(menuId: string): void {
    this.menuStates[menuId] = !this.menuStates[menuId];
  }

  closeMenu(menuId: string): void {
    this.menuStates[menuId] = false;
  }

  isMenuOpen(menuId: string): boolean {
    return this.menuStates[menuId] || false;
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      for (const menuId in this.menuStates) {
        if (this.menuStates[menuId]) {
          this.closeMenu(menuId);
        }
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    for (const menuId in this.menuStates) {
      const menuElement = document.getElementById(menuId);
      if (menuElement && !target.closest(`#${menuId}`) && this.menuStates[menuId]) {
        this.closeMenu(menuId);
      }
    }
  }
}
