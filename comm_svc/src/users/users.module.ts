import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProvider } from './users.provider';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [DatabaseModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [UsersController],
  providers: [UsersService, ...usersProvider, WebsocketGateway],
})
export class UsersModule {}
