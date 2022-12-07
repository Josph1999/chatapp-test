import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { JwtStrategy } from 'src/users/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { DatabaseService } from 'src/database/database.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'chatapp2022!',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [ChatsService, DatabaseService, JwtStrategy, UsersService],
  controllers: [ChatsController],
  exports: [JwtStrategy, PassportModule],
})
export class ChatsModule {}
