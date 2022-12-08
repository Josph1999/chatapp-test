"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const database_module_1 = require("./database/database.module");
const users_module_1 = require("./users/users.module");
const users_service_1 = require("./users/users.service");
const users_controller_1 = require("./users/users.controller");
const database_service_1 = require("./database/database.service");
const chats_module_1 = require("./chats/chats.module");
const messages_module_1 = require("./messages/messages.module");
const chat_gateway_1 = require("./chat/chat.gateway");
const messages_service_1 = require("./messages/messages.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['env/.env'],
            }),
            database_module_1.DatabaseModule,
            users_module_1.UsersModule,
            jwt_1.JwtModule.register({
                secret: 'chatapp2022!',
                signOptions: {
                    expiresIn: 3600,
                },
            }),
            chats_module_1.ChatsModule,
            messages_module_1.MessagesModule,
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, database_service_1.DatabaseService, chat_gateway_1.ChatGateway, messages_service_1.MessagesService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map