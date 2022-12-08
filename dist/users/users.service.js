"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(dataBaseService, jwtService) {
        this.dataBaseService = dataBaseService;
        this.jwtService = jwtService;
    }
    async createUser(createUserDto) {
        const { first_name, last_name, email, password, date_of_birth, username } = createUserDto;
        const uuid = (0, uuid_1.v4)();
        const salt = await bcrypt.genSalt();
        const hashedPassword = await this.hashPassword(password, salt);
        try {
            const [findedUserWithUsername] = await this.dataBaseService.executeQuery(`SELECT * FROM users WHERE username = '${username}'`);
            const [findedUserWithEmail] = await this.dataBaseService.executeQuery(`SELECT * FROM users WHERE email = '${email}'`);
            if (findedUserWithUsername || findedUserWithEmail) {
                throw new common_1.ConflictException("User Already Exsists!");
            }
            await this.dataBaseService.executeQuery(`
        INSERT INTO users (id, first_name, last_name, email, username, date_of_birth, password, salt )
        VALUES ('${uuid}', '${first_name}', '${last_name}', '${email}', '${username}', '${date_of_birth}', '${hashedPassword}', '${salt}')
        `);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async signIn(signInCredentialsDto) {
        try {
            const { password, email } = signInCredentialsDto;
            const [findedUser] = await this.dataBaseService.executeQuery(`SELECT * FROM users WHERE email = '${email}'`);
            if (!findedUser) {
                throw new common_1.UnauthorizedException("Invalid Credentials!");
            }
            const hash = await bcrypt.hash(password, findedUser.salt);
            if (hash === findedUser.password) {
                const payload = { email };
                const accessToken = this.jwtService.sign(payload);
                return { accessToken };
            }
            else {
                throw new common_1.UnauthorizedException("Invalid Credentials!");
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
    async getUserById(id) {
        try {
            const [user] = await this.dataBaseService.executeQuery(`SELECT * FROM users WHERE id = '${id}' `);
            if (!user) {
                throw new common_1.NotFoundException("User Not Found!");
            }
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async deleteUserById(id) {
        try {
            await this.dataBaseService.executeQuery(`
    DELETE FROM users WHERE id = '${id}'
    `);
        }
        catch (error) {
            new common_1.InternalServerErrorException(error);
        }
    }
    async getUserWithFilter(filterDto) {
        try {
            const { search } = filterDto;
            const filteredUser = await this.dataBaseService.executeQuery(`
      SELECT * FROM users ${search
                ? `WHERE username LIKE '%${search}%' OR email LIKE '%${search}%'`
                : ""}
      `);
            return filteredUser;
        }
        catch (error) {
            new common_1.InternalServerErrorException(error);
        }
    }
    async updateUserById(id, first_name, last_name, password, username, photo_url, gender, date_of_birth, currentUserDto, country, city) {
        try {
            const findedUser = await this.getUserById(id);
            const salt = await bcrypt.genSalt();
            const { email } = currentUserDto;
            const hashedPassword = await this.hashPassword(password ? password : "", salt);
            if (findedUser.email !== email) {
                throw new common_1.ForbiddenException("You don't have rights to update other user!");
            }
            const [updatedUser] = await this.dataBaseService.executeQuery(`
      UPDATE users SET first_name = '${first_name ? first_name : findedUser.first_name}', last_name = '${last_name ? last_name : findedUser.last_name}', password = '${password ? hashedPassword : findedUser.password}', username = '${username ? username : findedUser.username}', photo_url = '${photo_url ? photo_url : findedUser.photo_url}', gender = '${gender ? gender : findedUser.gender}', date_of_birth = '${date_of_birth ? date_of_birth : findedUser.date_of_birth}', salt = '${password ? salt : findedUser.salt}', country = '${country ? country : findedUser.country}', city = '${city ? city : findedUser.city}'   WHERE id = '${id}'
      `);
            return updatedUser;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async getCurrentUser(currentUserDto) {
        try {
            const { email } = currentUserDto;
            const [findedUser] = await this.dataBaseService.executeQuery(`
       SELECT id, first_name, last_name, email, username, date_of_birth, photo_url, created_at FROM users WHERE email = '${email}'
    `);
            const userChats = await this.dataBaseService.executeQuery(`
      SELECT c.id AS chat_id, u.first_name, u.last_name, u.username, u.photo_url
      FROM chats c
      JOIN users u
      ON (c.user_to::text = u.id::text AND user_to != '${findedUser.id}') OR (c.user_from::text = u.id::text AND user_from != '${findedUser.id}')
      WHERE c.user_from = '${findedUser.id}' OR c.user_to = '${findedUser.id}'
      
  `);
            const countries = await this.dataBaseService.executeQuery(`
      SELECT * FROM countries
  `);
            const data = {
                user_chats: userChats,
                current_user: findedUser,
                countries: countries,
            };
            return data;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map