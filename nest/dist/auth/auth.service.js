"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const moment_1 = __importDefault(require("moment"));
const user_service_1 = require("../modules/user/user.service");
let AuthService = class AuthService {
    constructor(configService, usersService, jwtService) {
        this.configService = configService;
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateApiKey(apiKey) {
        const isValid = apiKey === this.configService.get('xApiKey');
        if (!isValid)
            throw new Error('X-API-KEY 不正確');
        return isValid;
    }
    async validateUser(account, password) {
        const user = await this.usersService.findOneUser(account);
        if (!user)
            throw new Error('使用者帳號不存在');
        else if (!bcrypt.compareSync(password, user.password))
            throw new Error('密碼錯誤');
        return { id: user.id, account: user.account, roles: [] };
    }
    async createJwtToken(payload) {
        return this.jwtService.sign(payload, {
            secret: this.configService.get('jwtSecret'),
            issuer: this.configService.get('jwtIssuer'),
            subject: this.configService.get('jwtSubject'),
            audience: this.configService.get('jwtAudience'),
        });
    }
    async verifyJwtToken(token) {
        return this.jwtService.verify(token, {
            secret: this.configService.get('jwtSecret'),
            issuer: this.configService.get('jwtIssuer'),
            subject: this.configService.get('jwtSubject'),
            audience: this.configService.get('jwtAudience'),
        });
    }
    async createRefreshToken(payload) {
        const token = this.jwtService.sign(payload, {
            expiresIn: '7d',
            secret: this.configService.get('jwtSecret'),
            issuer: this.configService.get('jwtIssuer'),
            subject: this.configService.get('jwtSubject'),
            audience: this.configService.get('jwtAudience'),
        });
        await this.usersService.updateRefreshToken(payload.id, token, (0, moment_1.default)().utc().add(7, 'days').toDate());
        return token;
    }
    async refreshAccessToken(token) {
        const payload = this.verifyJwtToken(token);
        console.log(payload);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map