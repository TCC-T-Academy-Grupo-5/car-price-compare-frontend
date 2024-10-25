import {Component, HostListener, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '@ui/login/login.component';
import { RegisterComponent } from '@ui/register/register.component';
import { AuthService } from '@services/auth.service';

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
export class UserComponent implements OnInit{
  isLoggedIn: boolean | undefined;
  profileImgSrc = 'https://upload.wikimedia.org/wikipedia/pt/0/07/Daenerys_Targaryen.png';
  defaultImgSrc = 'assets/icons/default_avatar.svg';

  currentUser = {
    name: 'Daenerys Targaryen',
  };

  readonly menuId = 'userMenu';
  menuOpen = false;

  constructor(private router: Router, private dialog: MatDialog, private authService: AuthService) {}

  navigateToProfile() {
    this.router.navigate(['']).then(); // TODO adicionar rota correta para profile, criar tarefa no trello
  }

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if (token) {
      this.authService.validateToken(token).subscribe(data => {
        if (data) this.isLoggedIn = true;
        else localStorage.removeItem("token");
      })
    } else {
      this.isLoggedIn = false;
    }

    this.authService.isLoggedIn().subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    this.authService.logout();
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

  openLoginPopup(): void {
    this.dialog.open(LoginComponent, {
      width: '400px',
      disableClose: true,
    });
  }

  openRegisterPopup(): void {
    this.dialog.open(RegisterComponent, {
      width: '400px',
      disableClose: true,
    });
  }
}
