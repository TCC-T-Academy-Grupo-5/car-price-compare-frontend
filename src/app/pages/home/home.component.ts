import { Component } from '@angular/core';
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {MatTab, MatTabContent, MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'tcc-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatCardImage,
    MatCard,
    MatCardContent,
    TranslateModule,
    MatTabGroup,
    MatTab,
    MatTabContent,
    DatePipe
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
  protected readonly carImageDesktop: string = '../assets/images/car_default.png';
  protected readonly carImageMobile: string = '../assets/images/car_default_mobile.png';
  tabLoadTimes: Date[] = [];

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }
}
