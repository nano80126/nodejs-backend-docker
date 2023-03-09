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
exports.ApiKeyStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_headerapikey_1 = require("passport-headerapikey");
const auth_service_1 = require("../auth.service");
let ApiKeyStrategy = class ApiKeyStrategy extends (0, passport_1.PassportStrategy)(passport_headerapikey_1.HeaderAPIKeyStrategy, 'api-key') {
    constructor(authService) {
        super({ header: 'X-API-KEY', prefix: '' }, true, async (apiKey, done, req) => {
            this.validate(req, apiKey, done);
        });
        this.authService = authService;
    }
    async validate(req, apiKey, done) {
        try {
            const isValid = await this.authService.validateApiKey(apiKey);
            done(null, { apiKeyIsValid: isValid }, { message: 'X-API-KEY 驗證成功' });
        }
        catch (error) {
            done(new common_1.UnauthorizedException(error.message), null, { message: 'X-API-KEY 驗證失敗' });
        }
    }
};
ApiKeyStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], ApiKeyStrategy);
exports.ApiKeyStrategy = ApiKeyStrategy;
//# sourceMappingURL=apiKey.strategy.js.map