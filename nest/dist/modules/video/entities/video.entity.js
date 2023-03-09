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
exports.Video = void 0;
const typeorm_1 = require("typeorm");
const lyrics_entity_1 = require("../../lyrics/lyrics.entity");
let Video = class Video {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ comment: 'PK' }),
    __metadata("design:type", Number)
], Video.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 11, comment: '' }),
    __metadata("design:type", String)
], Video.prototype, "video_key", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'lyrics_id' }),
    (0, typeorm_1.ManyToOne)(() => lyrics_entity_1.Lyrics, (lyrics) => lyrics.videos),
    __metadata("design:type", lyrics_entity_1.Lyrics)
], Video.prototype, "lyrics_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Video.prototype, "song", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Video.prototype, "artist", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Video.prototype, "update_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Video.prototype, "insert_time", void 0);
Video = __decorate([
    (0, typeorm_1.Entity)()
], Video);
exports.Video = Video;
//# sourceMappingURL=video.entity.js.map