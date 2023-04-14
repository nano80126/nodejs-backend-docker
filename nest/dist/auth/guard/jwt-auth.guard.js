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
var JwtAuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const auth_decorator_1 = require("../auth.decorator");
const auth_service_1 = require("../auth.service");
let JwtAuthGuard = JwtAuthGuard_1 = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector, authService) {
        super();
        this.reflector = reflector;
        this.authService = authService;
        this.logger = new common_1.Logger(JwtAuthGuard_1.name);
    }
    handleRequest(err, user, info, context, status) {
        this.logger.debug('jwt', err, user, info, status);
        if (err)
            throw new common_1.UnauthorizedException(err.message);
        else if (!user && info)
            throw new common_1.UnauthorizedException(info.message);
        return user;
    }
    canActivate(context) {
        const isSkipJwt = this.reflector.getAllAndOverride(auth_decorator_1.IS_SKIP_JWT, [context.getHandler(), context.getClass()]);
        return isSkipJwt ? true : super.canActivate(context);
    }
};
JwtAuthGuard = JwtAuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, auth_service_1.AuthService])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=jwt-auth.guard.js.map