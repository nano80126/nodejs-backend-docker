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
exports.Lyrics = exports.SearchRecord = void 0;
const typeorm_1 = require("typeorm");
const video_entity_1 = require("../video/entities/video.entity");
let SearchRecord = class SearchRecord extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SearchRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, comment: '歌曲名' }),
    __metadata("design:type", String)
], SearchRecord.prototype, "song", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, comment: '歌手名' }),
    __metadata("design:type", String)
], SearchRecord.prototype, "artist", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '' }),
    __metadata("design:type", Date)
], SearchRecord.prototype, "update_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '' }),
    __metadata("design:type", Date)
], SearchRecord.prototype, "insert_time", void 0);
SearchRecord = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['song', 'artist'], { unique: true })
], SearchRecord);
exports.SearchRecord = SearchRecord;
let Lyrics = class Lyrics extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ comment: 'PK' }),
    __metadata("design:type", Number)
], Lyrics.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, comment: '歌詞 key, 來自歌詞網站' }),
    __metadata("design:type", String)
], Lyrics.prototype, "lyrics_key", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => video_entity_1.Video, (video) => video.lyrics_id),
    __metadata("design:type", Array)
], Lyrics.prototype, "videos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, comment: '演唱者' }),
    __metadata("design:type", String)
], Lyrics.prototype, "artist", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, comment: '歌曲名' }),
    __metadata("design:type", String)
], Lyrics.prototype, "song", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: '歌詞內容' }),
    __metadata("design:type", String)
], Lyrics.prototype, "lyrics", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Lyrics.prototype, "update_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Lyrics.prototype, "insert_time", void 0);
Lyrics = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['artist', 'song'], { unique: true })
], Lyrics);
exports.Lyrics = Lyrics;
//# sourceMappingURL=lyrics.entity.js.map