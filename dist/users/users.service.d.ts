import { DatabaseService } from "src/database/database.service";
import { CreateUserDto } from "./dto/create-users.dto";
import { JwtService } from "@nestjs/jwt";
import { SignInCredentialsDto } from "./dto/signin-credentials.dto";
import { User } from "./users.interface";
import { GetUsersFilterDto } from "./dto/get-users-filter.dto";
import { GetCurrentUserDto } from "./dto/current-user.dto";
export declare class UsersService {
    private dataBaseService;
    private jwtService;
    constructor(dataBaseService: DatabaseService, jwtService: JwtService);
    createUser(createUserDto: CreateUserDto): Promise<void>;
    signIn(signInCredentialsDto: SignInCredentialsDto): Promise<any>;
    private hashPassword;
    getUserById(id: string): Promise<User>;
    deleteUserById(id: string): Promise<void>;
    getUserWithFilter(filterDto: GetUsersFilterDto): Promise<User[]>;
    updateUserById(id: string, first_name?: string, last_name?: string, password?: string, username?: string, photo_url?: string, gender?: string, date_of_birth?: string, currentUserDto?: GetCurrentUserDto, country?: string, city?: string): Promise<User>;
    getCurrentUser(currentUserDto: GetCurrentUserDto): Promise<any>;
}
