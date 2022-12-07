import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { v4 as uuidv4 } from "uuid";
import { Message } from "./messages.intetface";
import { UpdateMessageDto } from "./dto/update-message.dto";

@Injectable()
export class MessagesService {
  constructor(private dataBaseService: DatabaseService) {}

  async createMessage(createMessageDto: CreateMessageDto): Promise<any> {
    const uuid = uuidv4();

    const { chat_id, user_id, text } = createMessageDto;

    try {
      const [createdMessage] = await this.dataBaseService.executeQuery(`
      INSERT INTO messages (id, user_id, chat_id, text)
      VALUES ('${uuid}', '${user_id}', '${chat_id}', '${text}')
      `);

      const newMessage = await this.dataBaseService.executeQuery(`
      SELECT * FROM messages WHERE id = '${uuid}'
      `)

      return newMessage;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteMessage(id: string): Promise<void> {
    try {
      await this.dataBaseService.executeQuery(`
       DELETE FROM messages WHERE id = '${id}'
      `);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateMessageById(
    id: string,
    updateMessageDto: UpdateMessageDto
  ): Promise<Message> {
    try {
      const { text } = updateMessageDto;

      const [updateMessage] = await this.dataBaseService.executeQuery(`
        UPDATE messages SET text = '${text}' WHERE id = '${id}'
        `);

      return updateMessage;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
