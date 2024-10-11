import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslateModule} from "@ngx-translate/core";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MenuService} from "@services/menu.service";
import {faUser} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'tcc-user',
  standalone: true,
  imports: [
    MatMenu,
    MatMenuItem,
    RouterLink,
    TranslateModule,
    MatMenuTrigger,
    FaIconComponent
  ],
  templateUrl: './user.component.html',
  styles: ``
})
export class UserComponent {

  private menuId = 'userMenu';

  constructor(private menuService: MenuService) {}

  toggleUserMenu(): void {
    this.menuService.toggleMenu(this.menuId);
  }

  closeUserMenu(): void {
    this.menuService.closeMenu(this.menuId);
  }

  isUserMenuOpen(): boolean {
    return this.menuService.isMenuOpen(this.menuId);
  }

  logout(): void {
    // TODO
  }

  protected readonly faUser = faUser;
}
