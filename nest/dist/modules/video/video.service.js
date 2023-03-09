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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoService = void 0;
const youtube_1 = require("@googleapis/youtube");
const common_1 = require("@nestjs/common");
const moment_1 = __importDefault(require("moment"));
let VideoService = class VideoService {
    constructor() {
        this.yt = (0, youtube_1.youtube)({
            auth: process.env.YT_API_KEY,
            version: 'v3',
        });
    }
    async getSearchList(queryString, pageToken) {
        const result = {};
        try {
            const res = await this.yt.search.list({
                part: ['snippet'],
                q: queryString,
                type: ['video'],
                pageToken: pageToken,
                maxResults: 20,
            });
            result.data = res.data;
        }
        catch (err) {
            result.error = err;
        }
        return result;
    }
    async getVideoInfo(videoID) {
        const result = {};
        try {
            const res = await this.yt.videos.list({
                part: ['contentDetails', 'status'],
                id: [videoID],
            });
            const details = res.data.items[0].contentDetails;
            const status = res.data.items[0].status;
            const split = details.duration.split(/[(PT)HMS]/);
            const time = (0, moment_1.default)(`${split[1] || '00'}:${split[2] || '00'}:${split[3] || '00'}`, 'H:m:s').format('HH:mm:ss');
            result.data = {
                definition: details.definition == 'hd' ? 'HD' : 'SD',
                dimension: details.dimension == '2d' ? '2D' : '3D',
                duration: time,
                embeddable: status.embeddable,
            };
        }
        catch (err) {
            result.error = err;
        }
        return result;
    }
    async getVideoThumbnail(videoID) {
        const result = {};
        console.log(videoID);
        try {
            const res = await this.yt.videos.list({
                part: ['snippet'],
                id: [videoID],
            });
            console.log(res);
            console.log(res.data);
            const snippet = res.data.items[0].snippet;
            const thumbnails = snippet.thumbnails;
            const image = thumbnails.maxres || thumbnails.standard || thumbnails.high || thumbnails.medium || thumbnails.default;
            const { url, width, height } = image;
            result.data = { url: new URL(url), width, height };
        }
        catch (err) {
            result.error = err;
        }
        return result;
    }
    async saveVideo() {
    }
};
VideoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], VideoService);
exports.VideoService = VideoService;
//# sourceMappingURL=video.service.js.map