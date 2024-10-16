import {HostListener, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private isOpen = false;

  get isMenuOpen(): boolean {
    return this.isOpen;
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  closeMenu(): void {
    this.isOpen = false;
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOpen) {
      this.closeMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.navbar') && this.isOpen) {
      this.closeMenu();
    }
  }
}
