import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {UserComponent} from "@ui/user/user.component";
import {TranslateModule} from "@ngx-translate/core";

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
  @Output() toggleMenu: EventEmitter<void> = new EventEmitter<void>();

  closeMenu() {
    this.toggleMenu.emit();
  }
}
