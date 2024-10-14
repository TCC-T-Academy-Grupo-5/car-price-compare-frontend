import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {UserComponent} from "@ui/user/user.component";
import {TranslateModule} from "@ngx-translate/core";
import {InteractionService} from "@services/interaction.service";

@Component({
  selector: 'tcc-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    UserComponent,
    TranslateModule
  ],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {

  @Input() isOpen: boolean = false;

  constructor(private interaction: InteractionService) {}

  toggleMenu(): void {
    this.interaction.toggleMenu();
  }

  closeMenu(): void {
    this.interaction.closeMenu();
  }
}
