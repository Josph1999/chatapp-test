import { ChatWithMessages } from "./chat-with-messages.interface";
import { Chat } from "./chat.interface";
import { ChatsService } from "./chats.service";
import { CreateChatDto } from "./dto/create-chat.dto";
export declare class ChatsController {
    private chatService;
    constructor(chatService: ChatsService);
    createChat(createChatDto: CreateChatDto): Promise<Chat>;
    getChatById(id: string): Promise<ChatWithMessages[]>;
    getChatByUsers(createChatDto: CreateChatDto): Promise<object>;
    deleteChatById(id: string): Promise<void>;
}
