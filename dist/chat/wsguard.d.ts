import { CanActivate } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
export declare class WsGuard implements CanActivate {
    private userService;
    private jwt;
    constructor(userService: UsersService, jwt: JwtService);
    canActivate(context: any): Promise<any>;
}
