import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
  private socket!: WebSocket;
  private messageSubject = new Subject<any>();

  constructor() {
    this.connect();
  }

  connect(): void {
    this.socket = new WebSocket('ws://localhost:8080/ws-notification');

    this.socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.messageSubject.next(data);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
      // Reconectar se necessário
      setTimeout(() => this.connect(), 5000);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
