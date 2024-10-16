import {Component, HostListener} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgIf} from "@angular/common";
import {InteractionService} from "@services/interaction.service";
import {MatButton} from "@angular/material/button";

interface User {
  name: string;
}

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

  currentUser: User = {
    name: 'Daenerys Targaryen',
  };

  constructor(private router: Router, private interaction: InteractionService) {}

  logout(): void {
    this.router.navigate(['/']).then((r) => console.log('redirect:', r));
  }

  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target as HTMLElement;
      target.click();
    }
  }

  handleImgError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultImgSrc;
  }

  toggleMenu(): void {
    this.interaction.toggleMenu();
  }

  closeMenu(): void {
    this.interaction.closeMenu();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const userMenu = document.getElementById('userMenu');

    if (userMenu && !userMenu.contains(target) && this.isLoggedIn) {
      this.closeMenu();
    }
  }
}
