"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const create_message_dto_1 = require("../messages/dto/create-message.dto");
const messages_service_1 = require("../messages/messages.service");
const users_service_1 = require("../users/users.service");
let ChatGateway = class ChatGateway {
    constructor(userService, messageService) {
        this.userService = userService;
        this.messageService = messageService;
        this.logger = new common_1.Logger("ChatGateway");
    }
    handleRoomJoin(client, chat) {
        console.log("mainId:", chat);
        client.join(chat);
        client.emit("joinedRoom", chat);
    }
    async listenForMessages(newMessage) {
        const [message] = await this.messageService.createMessage(newMessage);
        console.log("MessageChatId:", message === null || message === void 0 ? void 0 : message.chat_id);
        this.server.to(message.chat_id).emit("receive_message", message);
    }
    afterInit(server) {
        this.logger.log("Init");
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client connected: ${client.id}`);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("joinRoom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleRoomJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("send_message"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "listenForMessages", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: "*",
        },
        serveClient: true,
        transports: ["websocket"],
        rejectUnauthorized: true,
    }),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        messages_service_1.MessagesService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map