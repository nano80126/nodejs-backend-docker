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
exports.RefreshToken = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
let RefreshToken = class RefreshToken extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ comment: 'PK' }),
    __metadata("design:type", Number)
], RefreshToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_user'),
    (0, typeorm_1.OneToOne)(() => users_entity_1.User, (user) => user.refresh_token),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", users_entity_1.User)
], RefreshToken.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: '', length: 255, comment: 'refresh token' }),
    __metadata("design:type", String)
], RefreshToken.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: null }),
    __metadata("design:type", Date)
], RefreshToken.prototype, "expire_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], RefreshToken.prototype, "update_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], RefreshToken.prototype, "create_time", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', comment: '軟刪除時間，與User同步' }),
    __metadata("design:type", Date)
], RefreshToken.prototype, "delete_time", void 0);
RefreshToken = __decorate([
    (0, typeorm_1.Entity)()
], RefreshToken);
exports.RefreshToken = RefreshToken;
//# sourceMappingURL=refreshToken.entify.js.map