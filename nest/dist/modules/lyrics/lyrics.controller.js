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
exports.LyricsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lyrics_interface_1 = require("./dtos/lyrics.interface");
const lyrics_service_1 = require("./lyrics.service");
let LyricsController = class LyricsController {
    constructor(lyricsService) {
        this.lyricsService = lyricsService;
    }
    async getLyricsSearchRecords(res) {
        const result = await this.lyricsService.getSearchRecords(5, 5);
        res.status(common_1.HttpStatus.OK).send(result);
    }
    async createSearchRecord(res, searchLyricsReqDto) {
        const { artist, title } = searchLyricsReqDto;
        const result = await this.lyricsService.createSearchRecord(artist, title);
        res.status(common_1.HttpStatus.CREATED).send(result);
    }
    async getLyricsList(res, searchLyricsReqDto) {
        const { artist, title } = searchLyricsReqDto;
        if (artist === '' && title === '') {
            res.status(common_1.HttpStatus.BAD_REQUEST).send({
                message: '歌手與歌曲名皆為空，無法搜尋。',
            });
        }
        try {
            const lyrcisList = await this.lyricsService.getLyricsList(artist, title);
            res.status(common_1.HttpStatus.OK).send(lyrcisList);
        }
        catch (error) {
            res.status(common_1.HttpStatus.BAD_REQUEST).send({
                message: error.message,
            });
        }
    }
    async getLyricsContent(res, lyricsKey) {
        const result = await this.lyricsService.getLyricsContent(lyricsKey);
        if (result.error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send(result.error);
        }
        else {
            res.status(common_1.HttpStatus.OK).send(result.data);
        }
    }
    async saveLyricsContent(res, lyricsKey, saveLyricsReqDto) {
        const { lyrics_key, artist, song, lyrics } = saveLyricsReqDto;
        const result = await this.lyricsService.saveLyricsContent(lyrics_key, artist, song, lyrics);
        if ('errno' in result) {
            res.status(common_1.HttpStatus.BAD_REQUEST).send(result);
        }
        else {
            res.status(common_1.HttpStatus.OK).send(result);
        }
    }
    async deleteLyricsContent(res, lyricsKey) {
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'get lyrics search records successfully' }),
    (0, common_1.Get)('/search-records'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LyricsController.prototype, "getLyricsSearchRecords", null);
__decorate([
    (0, common_1.Post)('/search-records'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, lyrics_interface_1.SearchLyricsReqDto]),
    __metadata("design:returntype", Promise)
], LyricsController.prototype, "createSearchRecord", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'get lyrics list successfully' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, lyrics_interface_1.SearchLyricsReqDto]),
    __metadata("design:returntype", Promise)
], LyricsController.prototype, "getLyricsList", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'get lyrics content successfully' }),
    (0, common_1.Get)('/:key'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], LyricsController.prototype, "getLyricsContent", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.CREATED, description: 'save lyrics content successfully' }),
    (0, common_1.Post)('/:key'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('key')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, lyrics_interface_1.SaveLyricsReqDto]),
    __metadata("design:returntype", Promise)
], LyricsController.prototype, "saveLyricsContent", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.NO_CONTENT, description: 'delete lyrics content successfully' }),
    (0, common_1.Delete)('/:key'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], LyricsController.prototype, "deleteLyricsContent", null);
LyricsController = __decorate([
    (0, swagger_1.ApiTags)('Lyrics'),
    (0, common_1.Controller)('lyrics'),
    __metadata("design:paramtypes", [lyrics_service_1.LyricsService])
], LyricsController);
exports.LyricsController = LyricsController;
//# sourceMappingURL=lyrics.controller.js.map