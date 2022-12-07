import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/users/jwt.strategy';
import { DatabaseService } from 'src/database/database.service';

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
  providers: [MessagesService, DatabaseService, JwtStrategy],
  controllers: [MessagesController],
  exports: [JwtStrategy, PassportModule],
})
export class MessagesModule {}
