import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { DatabaseService } from './database/database.service';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { ChatGateway } from './chat/chat.gateway';
import { MessagesService } from './messages/messages.service';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['env/.env'],
    }),
    DatabaseModule,
    UsersModule,
    JwtModule.register({
      secret: 'chatapp2022!',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    ChatsModule,
    MessagesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, DatabaseService, ChatGateway, MessagesService],
})
export class AppModule {}
