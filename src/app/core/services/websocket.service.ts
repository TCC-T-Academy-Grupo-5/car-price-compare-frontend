import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
  private client: Client;
  private messageSubject = new Subject<any>();
  private connected = false;

  constructor() {
    this.client = new Client({
      webSocketFactory: () => {
        return new (SockJS as any)('http://localhost:8080/ws-notification') as WebSocket;
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('Connected to WebSocket');
        this.connected = true;
        this.subscribe();
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
        this.connected = false;
      },
      onStompError: (frame) => {
        console.error('STOMP error', frame);
      }
    });

    this.connect();
  }

  private subscribe(): void {
    this.client.subscribe('/topic/notification', (message: IMessage) => {
      try {
        const data = JSON.parse(message.body);
        this.messageSubject.next(data);
        console.log('Received message:', data);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });
  }

  connect(): void {
    this.client.activate();
  }

  disconnect(): void {
    this.client.deactivate();
  }

  sendMessage(destination: string, message: any): void {
    if (this.client.connected) {
      this.client.publish({
        destination: destination,
        body: JSON.stringify(message)
      });
    } else {
      console.error('Not connected to WebSocket');
    }
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  isConnected(): boolean {
    return this.connected;
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}