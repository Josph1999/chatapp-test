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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const uuid_1 = require("uuid");
let MessagesService = class MessagesService {
    constructor(dataBaseService) {
        this.dataBaseService = dataBaseService;
    }
    async createMessage(createMessageDto) {
        const uuid = (0, uuid_1.v4)();
        const { chat_id, user_id, text } = createMessageDto;
        try {
            const [createdMessage] = await this.dataBaseService.executeQuery(`
      INSERT INTO messages (id, user_id, chat_id, text)
      VALUES ('${uuid}', '${user_id}', '${chat_id}', '${text}')
      `);
            const newMessage = await this.dataBaseService.executeQuery(`
      SELECT * FROM messages WHERE id = '${uuid}'
      `);
            return newMessage;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async deleteMessage(id) {
        try {
            await this.dataBaseService.executeQuery(`
       DELETE FROM messages WHERE id = '${id}'
      `);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async updateMessageById(id, updateMessageDto) {
        try {
            const { text } = updateMessageDto;
            const [updateMessage] = await this.dataBaseService.executeQuery(`
        UPDATE messages SET text = '${text}' WHERE id = '${id}'
        `);
            return updateMessage;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
};
MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map