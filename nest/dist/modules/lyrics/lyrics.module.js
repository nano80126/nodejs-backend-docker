"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LyrcisModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lyrics_controller_1 = require("./lyrics.controller");
const lyrics_entity_1 = require("./lyrics.entity");
const lyrics_service_1 = require("./lyrics.service");
let LyrcisModule = class LyrcisModule {
};
LyrcisModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([lyrics_entity_1.SearchRecord, lyrics_entity_1.Lyrics])],
        controllers: [lyrics_controller_1.LyricsController],
        providers: [lyrics_service_1.LyricsService],
    })
], LyrcisModule);
exports.LyrcisModule = LyrcisModule;
//# sourceMappingURL=lyrics.module.js.map