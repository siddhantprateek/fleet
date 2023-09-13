import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class WebsocketGateway implements OnModuleInit {
  @WebSocketServer() server: Server;

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      console.log(`Client connected: ${socket.id}`);
      console.log('Socket Connected');
      socket.join(['room1', 'room2'])
    });
  }

  @SubscribeMessage('serviceHit')
  handleServiceHit(@MessageBody() data: string): void {
    this.server.to('room1').emit('serviceHit', data);
  }
}
