import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {UserComponent} from "@ui/user/user.component";
import {TranslateModule} from "@ngx-translate/core";
import {InteractionDirective} from '@directives/EventListenerDirectives';

@Component({
  selector: 'tcc-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    UserComponent,
    TranslateModule,
    InteractionDirective
  ],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {

  @Input() isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }
}
