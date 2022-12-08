import { OnGatewayInit } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { CreateMessageDto } from "src/messages/dto/create-message.dto";
import { MessagesService } from "src/messages/messages.service";
import { UsersService } from "src/users/users.service";
export declare class ChatGateway implements OnGatewayInit {
    private userService;
    private messageService;
    constructor(userService: UsersService, messageService: MessagesService);
    server: Server;
    private logger;
    handleRoomJoin(client: Socket, chat: string): void;
    listenForMessages(newMessage: CreateMessageDto): Promise<void>;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}
