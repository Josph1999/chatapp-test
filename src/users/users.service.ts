import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateUserDto } from "./dto/create-users.dto";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { create } from "domain";
import { JwtService } from "@nestjs/jwt";
import { SignInCredentialsDto } from "./dto/signin-credentials.dto";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./users.interface";
import { GetUsersFilterDto } from "./dto/get-users-filter.dto";
import { retry } from "rxjs";
import { GetCurrentUserDto } from "./dto/current-user.dto";

@Injectable()
export class UsersService {
  constructor(
    private dataBaseService: DatabaseService,
    private jwtService: JwtService
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { first_name, last_name, email, password, date_of_birth, username } =
      createUserDto;

    const uuid = uuidv4();

    const salt = await bcrypt.genSalt();

    const hashedPassword = await this.hashPassword(password, salt);

    try {
      const [findedUserWithUsername] = await this.dataBaseService.executeQuery(
        `SELECT * FROM users WHERE username = '${username}'`
      );
      const [findedUserWithEmail] = await this.dataBaseService.executeQuery(
        `SELECT * FROM users WHERE email = '${email}'`
      );
      if (findedUserWithUsername || findedUserWithEmail) {
        throw new ConflictException("User Already Exsists!");
      }
      await this.dataBaseService.executeQuery(`
        INSERT INTO users (id, first_name, last_name, email, username, date_of_birth, password, salt )
        VALUES ('${uuid}', '${first_name}', '${last_name}', '${email}', '${username}', '${date_of_birth}', '${hashedPassword}', '${salt}')
        `);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<any> {
    try {
      const { password, email } = signInCredentialsDto;

      const [findedUser] = await this.dataBaseService.executeQuery(
        `SELECT * FROM users WHERE email = '${email}'`
      );

      if (!findedUser) {
        throw new UnauthorizedException("Invalid Credentials!");
      }
      const hash = await bcrypt.hash(password, findedUser.salt);

      if (hash === findedUser.password) {
        const payload: JwtPayload = { email };

        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
      } else {
        throw new UnauthorizedException("Invalid Credentials!");
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  async getUserById(id: string): Promise<User> {
    try {
      const [user] = await this.dataBaseService.executeQuery(
        `SELECT * FROM users WHERE id = '${id}' `
      );

      if (!user) {
        throw new NotFoundException("User Not Found!");
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteUserById(id: string): Promise<void> {
    try {
      await this.dataBaseService.executeQuery(`
    DELETE FROM users WHERE id = '${id}'
    `);
    } catch (error) {
      new InternalServerErrorException(error);
    }
  }

  async getUserWithFilter(filterDto: GetUsersFilterDto): Promise<User[]> {
    try {
      const { search } = filterDto;

      const filteredUser = await this.dataBaseService.executeQuery(`
      SELECT * FROM users ${
        search
          ? `WHERE username LIKE '%${search}%' OR email LIKE '%${search}%'`
          : ""
      }
      `);

      return filteredUser;
    } catch (error) {
      new InternalServerErrorException(error);
    }
  }

  async updateUserById(
    id: string,
    first_name?: string,
    last_name?: string,
    password?: string,
    username?: string,
    photo_url?: string,
    gender?: string,
    date_of_birth?: string,
    currentUserDto?: GetCurrentUserDto,
    country?: string,
    city?: string
  ): Promise<User> {
    try {
      const findedUser = await this.getUserById(id);
      const salt = await bcrypt.genSalt();
      const { email } = currentUserDto;

      const hashedPassword = await this.hashPassword(
        password ? password : "",
        salt
      );

      if (findedUser.email !== email) {
        throw new ForbiddenException(
          "You don't have rights to update other user!"
        );
      }

      const [updatedUser] = await this.dataBaseService.executeQuery(`
      UPDATE users SET first_name = '${
        first_name ? first_name : findedUser.first_name
      }', last_name = '${
        last_name ? last_name : findedUser.last_name
      }', password = '${
        password ? hashedPassword : findedUser.password
      }', username = '${
        username ? username : findedUser.username
      }', photo_url = '${
        photo_url ? photo_url : findedUser.photo_url
      }', gender = '${gender ? gender : findedUser.gender}', date_of_birth = '${
        date_of_birth ? date_of_birth : findedUser.date_of_birth
      }', salt = '${password ? salt : findedUser.salt}', country = '${
        country ? country : findedUser.country
      }', city = '${city ? city : findedUser.city}'   WHERE id = '${id}'
      `);

      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getCurrentUser(currentUserDto: GetCurrentUserDto): Promise<any> {
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
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
