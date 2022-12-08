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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const uuid_1 = require("uuid");
const users_service_1 = require("../users/users.service");
let ChatsService = class ChatsService {
    constructor(dataBaseService, userService) {
        this.dataBaseService = dataBaseService;
        this.userService = userService;
    }
    async createChat(createChatDto) {
        try {
            const { user_from, user_to } = createChatDto;
            const uuid = (0, uuid_1.v4)();
            const [chatExsists] = await this.dataBaseService.executeQuery(`
      SELECT c.id FROM chats c WHERE user_from::text = '${user_from}' AND user_to::text = '${user_to}' 
    `);
            if (chatExsists) {
                throw new common_1.ConflictException("Chat is already created");
            }
            else {
                const [chat] = await this.dataBaseService.executeQuery(`
           INSERT INTO chats (id, user_from, user_to)
           VALUES ('${uuid}', '${user_from}', '${user_to}')
    `);
                const [createdChat] = await this.dataBaseService.executeQuery(`
      SELECT * FROM chats WHERE id = '${uuid}'
    `);
                return createdChat;
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async getChatById(id) {
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
                throw new common_1.NotFoundException("No chats found!");
            }
            return chat;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async getChatByUsers(createChatDto) {
        const { user_from, user_to } = createChatDto;
        try {
            const [chat] = await this.dataBaseService.executeQuery(`
      SELECT c.id FROM chats c WHERE user_from::text = '${user_from}' AND user_to::text = '${user_to}' 
    `);
            if (!chat) {
                throw new common_1.NotFoundException("No chats found!");
            }
            return chat;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async deleteChatById(id) {
        try {
            await this.dataBaseService.executeQuery(`
      DELETE FROM messages WHERE chat_id = '${id}'
      `);
            await this.dataBaseService.executeQuery(`
      DELETE FROM chats WHERE id = '${id}'
      `);
        }
        catch (error) {
            new common_1.InternalServerErrorException(error);
        }
    }
};
ChatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        users_service_1.UsersService])
], ChatsService);
exports.ChatsService = ChatsService;
//# sourceMappingURL=chats.service.js.map