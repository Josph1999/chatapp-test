import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { Message } from "./messages.intetface";
import { MessagesService } from "./messages.service";
export declare class MessagesController {
    private messageService;
    constructor(messageService: MessagesService);
    createMessage(createMessageDto: CreateMessageDto): Promise<Message>;
    deleteMessage(id: string): Promise<void>;
    updateMessageById(id: string, updateMessageDto: UpdateMessageDto): Promise<Message>;
}
