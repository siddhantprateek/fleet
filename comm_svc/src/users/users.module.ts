import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProvider } from './users.provider';
import { DatabaseModule } from 'src/database/database.module';
// import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { WebsocketGateway } from './websocket/websocket.gateway';
@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProvider, WebsocketGateway],
})
export class UsersModule {}
