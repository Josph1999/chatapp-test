import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';
// import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { JwtStrategy } from './jwt.strategy';
import { CurrentUserInterceptor } from './user.interceptor';

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
  providers: [UsersService, DatabaseService, JwtStrategy, CurrentUserInterceptor],
  controllers: [UsersController],
  exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
