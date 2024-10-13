import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'tcc-user',
  standalone: true,
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    TranslateModule,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styles: ``
})
export class UserComponent {
  constructor(private router: Router) {}

  logout(): void {
    this.router.navigate(['/']).then(r => console.log('redirect:', r));
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target as HTMLElement;
      target.click();
    }
  }
}
