import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Render,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDto } from "./dto/create-users.dto";
import { SignInCredentialsDto } from "./dto/signin-credentials.dto";
import { User } from "./users.interface";
import { UsersService } from "./users.service";
import { GetUsersFilterDto } from "./dto/get-users-filter.dto";
import { ParseUUIDPipe } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Request } from 'express'
import { GetUser } from "./get-user.decorator";
import { CurrentUserInterceptor } from "./user.interceptor";
import { GetCurrentUserDto } from "./dto/current-user.dto";

@ApiBearerAuth()
@Controller("users")
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("/create-user")
  createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto
  ): Promise<void> {
    return this.usersService.createUser(createUserDto);
  }

  @Post("/log-in")
  logIn(
    @Body(ValidationPipe) signInCredentialsDto: SignInCredentialsDto
  ): Promise<{ accessToken: string }> {
    return this.usersService.signIn(signInCredentialsDto);
  }

  @Get("/")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async getFilters(@Query() filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.usersService.getUserWithFilter(filterDto);
  }

  @Get("/current-user")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async getCurrentUser(@GetUser() currentUserDto: GetCurrentUserDto): Promise<any> {
    return this.usersService.getCurrentUser(currentUserDto);
  }

  @Get("/:id")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  getProductById(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Patch("/:id")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  updateUserById(
    @Param("id", ParseUUIDPipe) id: string,
    @Body("first_name") first_name?: string,
    @Body("last_name") last_name?: string,
    @Body("password") password?: string,
    @Body("username") username?: string,
    @Body("photo_url") photo_url?: string,
    @Body("gender") gender?: string,
    @Body("date_of_birth") date_of_birth?: string,
    @Body("country") country?: string,
    @Body("city") city?: string,
    @GetUser() currentUserDto?: GetCurrentUserDto

    
  ): Promise<User> {
    return this.usersService.updateUserById(
      id,
      first_name,
      last_name,
      password,
      username,
      photo_url,
      gender,
      date_of_birth,
      currentUserDto,
      country,
      city
    );
  }

  @Delete("/:id")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  deleteUserById(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.deleteUserById(id);
  }
}
