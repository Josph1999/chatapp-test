import { Logger, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { CreateMessageDto } from "src/messages/dto/create-message.dto";
import { MessagesService } from "src/messages/messages.service";
import { UsersService } from "src/users/users.service";
import { WsGuard } from "./wsguard";

// @UseGuards(WsGuard)
@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000",
  },
  serveClient: true,
  transports: ["websocket"],
  rejectUnauthorized: true,
})
export class ChatGateway implements OnGatewayInit {
  constructor(
    private userService: UsersService,
    private messageService: MessagesService
  ) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger("ChatGateway");

  @SubscribeMessage("joinRoom")
  handleRoomJoin(client: Socket, chat: string) {
    console.log("mainId:", chat);

    client.join(chat);
    client.emit("joinedRoom", chat);
  }

  @SubscribeMessage("send_message")
  async listenForMessages(@MessageBody() newMessage: CreateMessageDto) {
    const [message] = await this.messageService.createMessage(newMessage);

    console.log("MessageChatId:", message?.chat_id);

    this.server.to(message.chat_id).emit("receive_message", message);
  }

  afterInit(server: Server) {
    this.logger.log("Init");
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
