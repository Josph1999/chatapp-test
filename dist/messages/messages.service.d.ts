import { DatabaseService } from "src/database/database.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { Message } from "./messages.intetface";
import { UpdateMessageDto } from "./dto/update-message.dto";
export declare class MessagesService {
    private dataBaseService;
    constructor(dataBaseService: DatabaseService);
    createMessage(createMessageDto: CreateMessageDto): Promise<any>;
    deleteMessage(id: string): Promise<void>;
    updateMessageById(id: string, updateMessageDto: UpdateMessageDto): Promise<Message>;
}
