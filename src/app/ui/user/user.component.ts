import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgIf} from "@angular/common";

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
    NgIf
  ],
  templateUrl: './user.component.html',
  styles: ``
})
export class UserComponent {
  isLogedIn: boolean = true;
  profileImgSrc = 'https://upload.wikimedia.org/wikipedia/pt/0/07/Daenerys_Targaryen.png';
  defaultImgSrc = 'assets/icons/default_avatar.svg';

  currentUser: User = {
    name: 'Daenerys Targaryen',
  };

  constructor(private router: Router) {}

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
}
