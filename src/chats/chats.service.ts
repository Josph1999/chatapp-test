import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { Chat } from "./chat.interface";
import { CreateChatDto } from "./dto/create-chat.dto";
import { v4 as uuidv4 } from "uuid";
import { ChatWithMessages } from "./chat-with-messages.interface";
import { UsersService } from "src/users/users.service";
import { GetCurrentUserDto } from "src/users/dto/current-user.dto";

@Injectable()
export class ChatsService {
  constructor(
    private dataBaseService: DatabaseService,
    private userService: UsersService
  ) {}

  async createChat(createChatDto: CreateChatDto): Promise<Chat> {
    try {
      const { user_from, user_to } = createChatDto;

      const uuid = uuidv4();

      const [chatExsists] = await this.dataBaseService.executeQuery(`
      SELECT c.id FROM chats c WHERE user_from::text = '${user_from}' AND user_to::text = '${user_to}' 
    `);

      if (chatExsists) {
        throw new ConflictException("Chat is already created");
      } else {
        const [chat] = await this.dataBaseService.executeQuery(`
           INSERT INTO chats (id, user_from, user_to)
           VALUES ('${uuid}', '${user_from}', '${user_to}')
    `);

        const [createdChat] = await this.dataBaseService.executeQuery(`
      SELECT * FROM chats WHERE id = '${uuid}'
    `);

        return createdChat;
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getChatById(id: string): Promise<ChatWithMessages[]> {
    try {
      const chat = await this.dataBaseService.executeQuery(`
      SELECT m.id AS message_id, m.text, m.user_id, m.chat_id, m.created_at AS sent_at, u.photo_url, u.username
      FROM chats c
      JOIN messages m
      ON '${id}' = m.chat_id
      JOIN users u
      ON m.user_id::text = u.id::text
      WHERE m.chat_id = '${id}'
    `);

      if (!chat) {
        throw new NotFoundException("No chats found!");
      }

      return chat;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getChatByUsers(createChatDto: CreateChatDto): Promise<object> {
    const { user_from, user_to } = createChatDto;

    try {
      const [chat] = await this.dataBaseService.executeQuery(`
      SELECT c.id FROM chats c WHERE user_from::text = '${user_from}' AND user_to::text = '${user_to}' 
    `);
      if (!chat) {
        throw new NotFoundException("No chats found!");
      }

      return chat;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteChatById(id: string): Promise<void> {
    try {
      await this.dataBaseService.executeQuery(`
      DELETE FROM messages WHERE chat_id = '${id}'
      `);
      await this.dataBaseService.executeQuery(`
      DELETE FROM chats WHERE id = '${id}'
      `);
    } catch (error) {
      new InternalServerErrorException(error);
    }
  }
}
