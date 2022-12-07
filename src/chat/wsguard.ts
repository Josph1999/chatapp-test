import { CanActivate, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { JwtPayload } from "src/users/jwt-payload.interface";
import { UsersService } from "src/users/users.service";

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private userService: UsersService, private jwt: JwtService) {}

  async canActivate(context: any): Promise<any> {
    const bearerToken = context.args[0].handshake.headers.authorization;

    console.log(bearerToken);
    try {
      const decoded = (await this.jwt.verify(bearerToken)) as any;

      const { email } = decoded;
      console.log('email:', email)

      return new Promise((resolve, reject) => {
        return this.userService.getCurrentUser(decoded).then((user) => {
          if (user) {
            console.log(user);
            resolve(user);
          } else {
            reject(false);
          }
        });
      });
    } catch (err) {
      throw new UnauthorizedException('You are not Authorized')
    }
  }
}
