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
exports.VideoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const video_interface_1 = require("./dtos/video.interface");
const video_service_1 = require("./video.service");
let VideoController = class VideoController {
    constructor(videoService) {
        this.videoService = videoService;
    }
    async getVideoSearchList(res, query) {
        const { queryString, pageToken } = query;
        const result = await this.videoService.getSearchList(queryString, pageToken);
        if (result.error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send(result.error);
        }
        else {
            return res.status(common_1.HttpStatus.OK).send(result.data);
        }
    }
    async getVideoInformation(res, videoID) {
        const id = videoID;
        const result = await this.videoService.getVideoInfo(id);
        if (result.error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send(result.error);
        }
        else {
            return res.status(common_1.HttpStatus.OK).send(result.data);
        }
    }
    async getVideoThumbnail(res, videoID) {
        const id = videoID;
        const result = await this.videoService.getVideoThumbnail(id);
        if (result.error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send(result.error);
        }
        else {
            return res.status(common_1.HttpStatus.OK).send(result.data);
        }
    }
    async saveYoutTube(res, saveYouTubeReqDto) {
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: '' }),
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, video_interface_1.VideoSearchListDto]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getVideoSearchList", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: '取得 video contentDetails and status' }),
    (0, common_1.Get)('info/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getVideoInformation", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: '取得 video snippet thumbnails' }),
    (0, common_1.Get)('image/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getVideoThumbnail", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: '' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, video_interface_1.VideoSaveReqDTO]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "saveYoutTube", null);
VideoController = __decorate([
    (0, swagger_1.ApiTags)('Video'),
    (0, common_1.Controller)('video'),
    __metadata("design:paramtypes", [video_service_1.VideoService])
], VideoController);
exports.VideoController = VideoController;
//# sourceMappingURL=video.controller.js.map