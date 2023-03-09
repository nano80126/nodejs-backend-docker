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
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../../auth/auth.decorator");
const users_interface_1 = require("./dtos/users.interface");
const user_service_1 = require("./user.service");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getUserList(req, res) {
        try {
            const result = await this.usersService.findAllUsers();
            res.status(common_1.HttpStatus.OK).send(result);
        }
        catch (error) {
            res.status(common_1.HttpStatus.BAD_REQUEST).send(error);
        }
    }
    async getUserDetail(req, res, userId) {
        console.log('userId', userId);
        res.status(200).send(userId);
    }
    async createUser(res, createUserDto) {
        const { account, password, passwordRepeat } = createUserDto;
        try {
            if (await this.usersService.checkAccountExist(account)) {
                res.status(common_1.HttpStatus.BAD_REQUEST).send({
                    state: common_1.HttpStatus.BAD_REQUEST,
                    message: '此帳號已存在',
                });
                return;
            }
            else if (password !== passwordRepeat) {
                res.status(common_1.HttpStatus.BAD_REQUEST).send({
                    state: common_1.HttpStatus.BAD_REQUEST,
                    message: '密碼與密碼確認不符',
                });
                return;
            }
            else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(password) == false) {
                res.status(common_1.HttpStatus.BAD_REQUEST).send({
                    state: common_1.HttpStatus.BAD_REQUEST,
                    message: '密碼不符合規則，須為8~16碼之大寫、小寫與數字之組合',
                });
                return;
            }
            const result = await this.usersService.createUser(account, password);
            res.status(common_1.HttpStatus.OK).send(result);
        }
        catch (error) {
            res.status(common_1.HttpStatus.BAD_REQUEST).send({
                message: error.message,
            });
        }
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'get users list successfully' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserList", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'get users list successfully' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserDetail", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.CREATED, description: '' }),
    (0, auth_decorator_1.SkipJwtToken)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_interface_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=user.controller.js.map