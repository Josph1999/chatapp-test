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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const create_users_dto_1 = require("./dto/create-users.dto");
const signin_credentials_dto_1 = require("./dto/signin-credentials.dto");
const users_service_1 = require("./users.service");
const get_users_filter_dto_1 = require("./dto/get-users-filter.dto");
const common_2 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const get_user_decorator_1 = require("./get-user.decorator");
const user_interceptor_1 = require("./user.interceptor");
const current_user_dto_1 = require("./dto/current-user.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    createUser(createUserDto) {
        return this.usersService.createUser(createUserDto);
    }
    logIn(signInCredentialsDto) {
        return this.usersService.signIn(signInCredentialsDto);
    }
    async getFilters(filterDto) {
        return this.usersService.getUserWithFilter(filterDto);
    }
    async getCurrentUser(currentUserDto) {
        return this.usersService.getCurrentUser(currentUserDto);
    }
    getProductById(id) {
        return this.usersService.getUserById(id);
    }
    updateUserById(id, first_name, last_name, password, username, photo_url, gender, date_of_birth, country, city, currentUserDto) {
        return this.usersService.updateUserById(id, first_name, last_name, password, username, photo_url, gender, date_of_birth, currentUserDto, country, city);
    }
    deleteUserById(id) {
        return this.usersService.deleteUserById(id);
    }
};
__decorate([
    (0, common_1.Post)("/create-user"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_users_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)("/log-in"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_credentials_dto_1.SignInCredentialsDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logIn", null);
__decorate([
    (0, common_1.Get)("/"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_users_filter_dto_1.GetUsersFilterDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getFilters", null);
__decorate([
    (0, common_1.Get)("/current-user"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [current_user_dto_1.GetCurrentUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Get)("/:id"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)("id", common_2.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProductById", null);
__decorate([
    (0, common_1.Patch)("/:id"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)("id", common_2.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)("first_name")),
    __param(2, (0, common_1.Body)("last_name")),
    __param(3, (0, common_1.Body)("password")),
    __param(4, (0, common_1.Body)("username")),
    __param(5, (0, common_1.Body)("photo_url")),
    __param(6, (0, common_1.Body)("gender")),
    __param(7, (0, common_1.Body)("date_of_birth")),
    __param(8, (0, common_1.Body)("country")),
    __param(9, (0, common_1.Body)("city")),
    __param(10, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String, String, current_user_dto_1.GetCurrentUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserById", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)("id", common_2.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUserById", null);
UsersController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("users"),
    (0, common_1.UseInterceptors)(user_interceptor_1.CurrentUserInterceptor),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map