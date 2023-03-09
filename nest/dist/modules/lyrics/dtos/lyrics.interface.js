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
exports.UpdateLyricsReqDTO = exports.SaveLyricsReqDto = exports.SearchLyricsContentResDto = exports.SearchLyricsResDto = exports.SearchLyricsRecordDto = exports.SearchLyricsReqDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SearchLyricsReqDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ maxLength: 20, required: false, description: '歌手名' }),
    __metadata("design:type", String)
], SearchLyricsReqDto.prototype, "artist", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ maxLength: 20, required: false, description: '歌名' }),
    __metadata("design:type", String)
], SearchLyricsReqDto.prototype, "title", void 0);
exports.SearchLyricsReqDto = SearchLyricsReqDto;
class SearchLyricsRecordDto extends SearchLyricsReqDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], SearchLyricsRecordDto.prototype, "insertTime", void 0);
exports.SearchLyricsRecordDto = SearchLyricsRecordDto;
class SearchLyricsResDto extends SearchLyricsReqDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SearchLyricsResDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SearchLyricsResDto.prototype, "lyricsUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SearchLyricsResDto.prototype, "lyricsID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SearchLyricsResDto.prototype, "lyricsShort", void 0);
exports.SearchLyricsResDto = SearchLyricsResDto;
class SearchLyricsContentResDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '歌手名' }),
    __metadata("design:type", String)
], SearchLyricsContentResDto.prototype, "artist", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SearchLyricsContentResDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SearchLyricsContentResDto.prototype, "lyricsID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SearchLyricsContentResDto.prototype, "lyrcisUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SearchLyricsContentResDto.prototype, "lyrics", void 0);
exports.SearchLyricsContentResDto = SearchLyricsContentResDto;
class SaveLyricsReqDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ maxLength: 10, required: true, description: '歌詞ID' }),
    __metadata("design:type", String)
], SaveLyricsReqDto.prototype, "lyrics_key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ maxLength: 20, required: true, description: '(原)演唱者' }),
    __metadata("design:type", String)
], SaveLyricsReqDto.prototype, "artist", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ maxLength: 20, required: true, description: '歌曲名' }),
    __metadata("design:type", String)
], SaveLyricsReqDto.prototype, "song", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: '歌詞' }),
    __metadata("design:type", String)
], SaveLyricsReqDto.prototype, "lyrics", void 0);
exports.SaveLyricsReqDto = SaveLyricsReqDto;
class UpdateLyricsReqDTO {
}
exports.UpdateLyricsReqDTO = UpdateLyricsReqDTO;
//# sourceMappingURL=lyrics.interface.js.map