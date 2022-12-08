"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsModule = void 0;
const common_1 = require("@nestjs/common");
const chats_service_1 = require("./chats.service");
const chats_controller_1 = require("./chats.controller");
const jwt_strategy_1 = require("../users/jwt.strategy");
const passport_1 = require("@nestjs/passport");
const database_service_1 = require("../database/database.service");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let ChatsModule = class ChatsModule {
};
ChatsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: 'chatapp2022!',
                signOptions: {
                    expiresIn: 3600,
                },
            }),
        ],
        providers: [chats_service_1.ChatsService, database_service_1.DatabaseService, jwt_strategy_1.JwtStrategy, users_service_1.UsersService],
        controllers: [chats_controller_1.ChatsController],
        exports: [jwt_strategy_1.JwtStrategy, passport_1.PassportModule],
    })
], ChatsModule);
exports.ChatsModule = ChatsModule;
//# sourceMappingURL=chats.module.js.map