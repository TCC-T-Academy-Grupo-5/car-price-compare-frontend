import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { CommonModule, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { WebSocketService } from '@services/websocket.service';
import { AuthService } from '@services/auth.service';
import { NotificationService } from '@services/user/notification.service';
import { NotificationResponse } from '@domain/vehicle/notification-response';

@Component({
  selector: 'tcc-notification',
  standalone: true,
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    TranslateModule,
    RouterLink,
    NgIf,
    MatButton,
    CommonModule
  ],
  template: `
<div class="relative">
  <button (click)="toggleMenu()" class="cursor-pointer">
    <i class="material-icons"
      [matMenuTriggerFor]="notifMenu"
      mat-button
      aria-label="Notification Menu"
      aria-haspopup="true"
      tabindex="0"
      class="material-symbols-outlined hidden md:block"
    >notifications</i>

    <span *ngIf="notifications.length > 0" 
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
        {{ notifications.length }}
    </span>
  </button>
  <mat-menu #notifMenu="matMenu" xPosition="before" id="{{ menuId }}">
    <ul>
      <li *ngFor="let notification of notifications" class="p-2 border-b border-gray-200" (click)="goToVehicleDetails(notification.vehicle.vehicleId)">
        {{ notification.vehicle.name }} <br>
        {{ notification.vehicle.brand }} <br>
        {{ notification.currentFipePrice }}
      </li>
      <li *ngIf="notifications.length === 0" class="p-2 text-gray-500">Sem notificações</li>
    </ul>
  </mat-menu>
</div>
`,
  styles: []
})
export class NotificationComponent implements OnInit {
  notifications: NotificationResponse[] = [];
  notifMenu = 'notifyMenu';
  readonly menuId = 'notifyMenu';
  menuOpen = false;
  isLoggedIn: boolean = false;

  constructor(private webSocketService: WebSocketService,
              private notificationService: NotificationService,
              private router: Router) {}

  ngOnInit(): void {
    this.updateNotifications();
    
    this.webSocketService.getMessages().subscribe(notification => {
      console.log('Notificação recebida:', notification);
      this.updateNotifications();
    });
  }

  updateNotifications() {
    this.notificationService.getNotification().subscribe((data) => {
      this.notifications = data;
      console.log(data);
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const notificationMenu = document.getElementById('notificationMenu');

    if (notificationMenu && !notificationMenu.contains(target) && this.menuOpen) {
      this.closeMenu();
    }
  }

  goToVehicleDetails(id: string){
    this.router.navigate([`/vehicle-details/${id}`]).then();
  }
}
