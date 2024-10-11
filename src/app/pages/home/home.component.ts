import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'tcc-home',
  standalone: true,
  imports: [
    FaIconComponent,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
  constructor() {
    library.add(fas);
  }
}
