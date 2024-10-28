import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { CommonModule, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { WebSocketService } from '@services/websocket.service';
import { AuthService } from '@services/auth.service';

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
  </button>
  <mat-menu #notifMenu="matMenu" xPosition="before" id="{{ menuId }}">
    <ul>
      <li *ngFor="let notification of notifications" class="p-2 border-b border-gray-200">
        {{ notification.message }}
      </li>
      <li *ngIf="notifications.length === 0" class="p-2 text-gray-500">Sem notificações</li>
    </ul>
  </mat-menu>
</div>
`,
  styles: []
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];
  notifMenu = 'notifyMenu';
  readonly menuId = 'notifyMenu';
  menuOpen = false;
  isLoggedIn: boolean = false;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.notifications = [
      { message: 'Notificação 1: Você tem uma nova mensagem.' },
      { message: 'Notificação 2: Seu perfil foi atualizado.' },
      { message: 'Notificação 3: Você recebeu uma nova conexão.' }
    ];

    this.webSocketService.getMessages().subscribe(notification => {
      console.log('Notificação recebida:', notification);
      this.notifications.push(notification);
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
}
