import { CreateUserDto } from "./dto/create-users.dto";
import { SignInCredentialsDto } from "./dto/signin-credentials.dto";
import { User } from "./users.interface";
import { UsersService } from "./users.service";
import { GetUsersFilterDto } from "./dto/get-users-filter.dto";
import { GetCurrentUserDto } from "./dto/current-user.dto";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<void>;
    logIn(signInCredentialsDto: SignInCredentialsDto): Promise<{
        accessToken: string;
    }>;
    getFilters(filterDto: GetUsersFilterDto): Promise<User[]>;
    getCurrentUser(currentUserDto: GetCurrentUserDto): Promise<any>;
    getProductById(id: string): Promise<User>;
    updateUserById(id: string, first_name?: string, last_name?: string, password?: string, username?: string, photo_url?: string, gender?: string, date_of_birth?: string, country?: string, city?: string, currentUserDto?: GetCurrentUserDto): Promise<User>;
    deleteUserById(id: string): Promise<void>;
}
