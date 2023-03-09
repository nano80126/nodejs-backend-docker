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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const refreshToken_entify_1 = require("./refreshToken.entify");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ comment: 'PK' }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, comment: '帳號' }),
    __metadata("design:type", String)
], User.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 60, comment: '密碼' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, comment: '遮蔽的密碼' }),
    __metadata("design:type", String)
], User.prototype, "password_masked", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], User.prototype, "update_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], User.prototype, "create_time", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', comment: '軟刪除時間' }),
    __metadata("design:type", Date)
], User.prototype, "delete_time", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => refreshToken_entify_1.RefreshToken, (token) => token.user),
    __metadata("design:type", refreshToken_entify_1.RefreshToken)
], User.prototype, "refresh_token", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=users.entity.js.map