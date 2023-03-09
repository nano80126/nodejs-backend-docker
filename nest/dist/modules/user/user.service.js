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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt_1 = require("bcrypt");
const typeorm_2 = require("typeorm");
const refreshToken_entify_1 = require("./entities/refreshToken.entify");
const users_entity_1 = require("./entities/users.entity");
const redis_service_1 = require("../redis.service");
let UsersService = class UsersService {
    constructor(userRepository, refreshTokenRepository, redisService, dataSource) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.redisService = redisService;
        this.dataSource = dataSource;
    }
    async checkAccountExist(account) {
        return await this.userRepository.exist({
            where: {
                account: account,
            },
        });
    }
    async createUser(account, password) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = new users_entity_1.User();
            user.account = account;
            user.password = await (0, bcrypt_1.hash)(password, 10);
            user.password_masked = password.padEnd(20, '*').substring(0, 4).padEnd(12, '*');
            const userCreatedResponse = await queryRunner.manager.save(user);
            const token = new refreshToken_entify_1.RefreshToken();
            token.user = userCreatedResponse;
            const tokenCreatedResponse = await queryRunner.manager.save(token);
            await queryRunner.commitTransaction();
            return tokenCreatedResponse;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.BadRequestException(error.message);
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateUser(id) {
        const user = await this.userRepository.findOneBy({ id: id });
        user.save();
    }
    async findOneUser(account) {
        return this.userRepository.findOne({
            where: {
                account: account,
            },
            select: ['id', 'account', 'password', 'password_masked', 'create_time', 'update_time'],
        });
    }
    async findAllUsers() {
        return (this.userRepository
            .createQueryBuilder('users')
            .getMany());
    }
    async removeUser(user_id) {
        const user = await this.userRepository.findOneBy({ id: user_id });
        return user.softRemove();
    }
    async updateRefreshToken(userId, newToken, expireTime) {
        const builder = this.refreshTokenRepository
            .createQueryBuilder('r')
            .leftJoin('r.user', 'u')
            .where('r.user_id = :userId', { userId })
            .select(['r.id', 'r.user_id', 'r.expire_time', 'r.update_time']);
        const token = await builder.getOne();
        token.token = newToken;
        token.expire_time = expireTime;
        token.update_time = null;
        return token.save();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(refreshToken_entify_1.RefreshToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        redis_service_1.RedisService,
        typeorm_2.DataSource])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=user.service.js.map