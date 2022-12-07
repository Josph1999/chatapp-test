import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { DatabaseService } from "src/database/database.service";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./users.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private databaseService: DatabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "chatapp2022!",
      algorithms: ['HS256'],
    });
  }

  async validate(payload: JwtPayload): Promise<User[]> {
    const { email } = payload;

    const user = await this.databaseService.executeQuery(`
      SELECT email FROM users WHERE email = '${email}'
    `);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
