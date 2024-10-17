import {Component, HostListener} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'tcc-user',
  standalone: true,
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    TranslateModule,
    RouterLink,
    NgIf,
    MatButton
  ],
  templateUrl: './user.component.html',
  styles: ``
})
export class UserComponent {
  isLoggedIn = true;
  profileImgSrc = 'https://upload.wikimedia.org/wikipedia/pt/0/07/Daenerys_Targaryen.png';
  defaultImgSrc = 'assets/icons/default_avatar.svg';

  currentUser = {
    name: 'Daenerys Targaryen',
  };

  readonly menuId = 'userMenu';
  menuOpen = false;

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    this.router.navigate(['/']).then((r) => console.log('redirect:', r));
  }

  handleImgError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultImgSrc;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const userMenu = document.getElementById(this.menuId);

    if (userMenu && !userMenu.contains(target) && this.menuOpen) {
      this.closeMenu();
    }
  }

  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleMenu();
    }
  }
}
