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
exports.ChatsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const chats_service_1 = require("./chats.service");
const create_chat_dto_1 = require("./dto/create-chat.dto");
let ChatsController = class ChatsController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    createChat(createChatDto) {
        return this.chatService.createChat(createChatDto);
    }
    getChatById(id) {
        return this.chatService.getChatById(id);
    }
    getChatByUsers(createChatDto) {
        return this.chatService.getChatByUsers(createChatDto);
    }
    deleteChatById(id) {
        return this.chatService.deleteChatById(id);
    }
};
__decorate([
    (0, common_1.Post)("/create-chat"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chat_dto_1.CreateChatDto]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "createChat", null);
__decorate([
    (0, common_1.Get)("/:id"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getChatById", null);
__decorate([
    (0, common_1.Get)("/current-chat"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chat_dto_1.CreateChatDto]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getChatByUsers", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "deleteChatById", null);
ChatsController = __decorate([
    (0, common_1.Controller)("chats"),
    __metadata("design:paramtypes", [chats_service_1.ChatsService])
], ChatsController);
exports.ChatsController = ChatsController;
//# sourceMappingURL=chats.controller.js.map