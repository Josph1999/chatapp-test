import { Strategy } from "passport-jwt";
import { DatabaseService } from "src/database/database.service";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./users.interface";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private databaseService;
    constructor(databaseService: DatabaseService);
    validate(payload: JwtPayload): Promise<User[]>;
}
export {};
