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
var ApiKeyAuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const auth_decorator_1 = require("../auth.decorator");
let ApiKeyAuthGuard = ApiKeyAuthGuard_1 = class ApiKeyAuthGuard extends (0, passport_1.AuthGuard)('api-key') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
        this.logger = new common_1.Logger(ApiKeyAuthGuard_1.name);
    }
    handleRequest(err, user, info, context, status) {
        if (err)
            throw new common_1.UnauthorizedException(err.message);
        else if (!user && info)
            throw new common_1.UnauthorizedException(info.message);
        return user;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(auth_decorator_1.IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        return isPublic ? true : super.canActivate(context);
    }
};
ApiKeyAuthGuard = ApiKeyAuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], ApiKeyAuthGuard);
exports.ApiKeyAuthGuard = ApiKeyAuthGuard;
//# sourceMappingURL=apiKey-auth.guard.js.map