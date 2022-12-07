import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { Message } from "./messages.intetface";
import { MessagesService } from "./messages.service";

@Controller("messages")
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Post("/create-message")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async createMessage(
    @Body(ValidationPipe) createMessageDto: CreateMessageDto
  ): Promise<Message> {
    return this.messageService.createMessage(createMessageDto);
  }

  @Delete("/:id")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async deleteMessage(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.messageService.deleteMessage(id);
  }

  @Patch("/:id")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async updateMessageById(
    @Param("id", ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateMessageDto: UpdateMessageDto
  ): Promise<Message> {
    return this.messageService.updateMessageById(id, updateMessageDto);
  }
}
