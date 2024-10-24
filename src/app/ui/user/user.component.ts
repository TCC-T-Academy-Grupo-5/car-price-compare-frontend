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
  isLoggedIn = false;
  profileImgSrc = 'https://upload.wikimedia.org/wikipedia/pt/0/07/Daenerys_Targaryen.png';
  defaultImgSrc = 'assets/icons/default_avatar.svg';

  currentUser = {
    name: 'Daenerys Targaryen',
  };

  readonly menuId = 'userMenu';
  menuOpen = false;

  constructor(private router: Router, private dialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if (token) {
      this.authService.validateToken(token).subscribe(data => {
        if (data) this.isLoggedIn = true;
        else localStorage.removeItem("token");
      })
    } else {
      this.isLoggedIn = false;
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    localStorage.removeItem("token");
    this.isLoggedIn = false;
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
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px', 
      disableClose: true,
    });

    dialogRef.componentInstance.close.subscribe(() => {
      dialogRef.close(); 
    });
  }

  openRegisterPopup(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.componentInstance.close.subscribe(() => {
      dialogRef.close(); 
    });
  }
}
