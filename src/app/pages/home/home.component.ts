import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {NgOptimizedImage} from "@angular/common";
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'tcc-home',
  standalone: true,
  imports: [
    FaIconComponent,
    NgOptimizedImage,
    MatCardImage,
    MatCard,
    MatCardContent,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
  constructor() {
  }
}
