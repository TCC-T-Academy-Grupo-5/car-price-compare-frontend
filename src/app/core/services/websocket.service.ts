import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface MessagePayload {
  vehicleId: string;
  notificationId: string;
}

interface SockJSWebSocket extends WebSocket {
  close(code?: number, reason?: string): void;
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
  private client: Client;
  private messageSubject = new Subject<MessagePayload>();
  private connected = false;

  constructor() {
    this.client = new Client({
      webSocketFactory: () => {
        return new SockJS('http://localhost:8080/ws-notification') as SockJSWebSocket;
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
        const data: MessagePayload = JSON.parse(message.body);
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

  sendMessage(destination: string, message: MessagePayload): void {
    if (this.client.connected) {
      this.client.publish({
        destination: destination,
        body: JSON.stringify(message)
      });
    } else {
      console.error('Not connected to WebSocket');
    }
  }

  getMessages(): Observable<MessagePayload> {
    return this.messageSubject.asObservable();
  }

  isConnected(): boolean {
    return this.connected;
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
