import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway {
  @WebSocketServer() server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('serviceHit')
  handleServiceHit(@MessageBody() data: string): void {
    this.server.emit('serviceHit', data);
  }
}
