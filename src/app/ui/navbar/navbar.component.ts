import {Component, HostListener, Inject, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import {DOCUMENT, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {filter} from "rxjs";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ItemsMap} from "@services/interfaces/ItemsMap";
import {TranslateModule} from "@ngx-translate/core";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'tcc-navbar',
  standalone: true,
  imports: [
    NgClass,
    FaIconComponent,
    MatMenu,
    TranslateModule,
    MatMenuItem,
    NgIf,
    NgForOf,
    MatMenuTrigger,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent implements OnInit {
  currentRoute: string = '';
  activeClass: string = "border-b-2 transform";
  inactiveClass: string = "hover:border-b-2 border-tcc-highlight-light dark:border-tcc-highlight hover:transform";

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects
    });
  }

  isActive(route: string): string {
    const isRoute: boolean = this.currentRoute === route;
    return isRoute ? this.activeClass : this.inactiveClass;
  }
}
