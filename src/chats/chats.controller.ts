import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetCurrentUserDto } from "src/users/dto/current-user.dto";
import { GetUser } from "src/users/get-user.decorator";
import { ChatWithMessages } from "./chat-with-messages.interface";
import { Chat } from "./chat.interface";
import { ChatsService } from "./chats.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { GetUserChatDto } from "./dto/get-user-chat.dto";

@Controller("chats")
export class ChatsController {
  constructor(private chatService: ChatsService) {}

  @Post("/create-chat")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  createChat(
    @Body(ValidationPipe) createChatDto: CreateChatDto
  ): Promise<Chat> {
    return this.chatService.createChat(createChatDto);
  }

  @Get("/:id")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  getChatById(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<ChatWithMessages[]> {
    return this.chatService.getChatById(id);
  }

  @Get("/current-chat")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  getChatByUsers(
    @Body(ValidationPipe) createChatDto: CreateChatDto
  ): Promise<object> {
    return this.chatService.getChatByUsers(createChatDto);
  }

  @Delete("/:id")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  deleteChatById(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.chatService.deleteChatById(id);
  }
}
