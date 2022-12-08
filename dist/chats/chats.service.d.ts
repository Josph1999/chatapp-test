import { DatabaseService } from "src/database/database.service";
import { Chat } from "./chat.interface";
import { CreateChatDto } from "./dto/create-chat.dto";
import { ChatWithMessages } from "./chat-with-messages.interface";
import { UsersService } from "src/users/users.service";
export declare class ChatsService {
    private dataBaseService;
    private userService;
    constructor(dataBaseService: DatabaseService, userService: UsersService);
    createChat(createChatDto: CreateChatDto): Promise<Chat>;
    getChatById(id: string): Promise<ChatWithMessages[]>;
    getChatByUsers(createChatDto: CreateChatDto): Promise<object>;
    deleteChatById(id: string): Promise<void>;
}
