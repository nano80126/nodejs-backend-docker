"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const chai_1 = require("chai");
const lyrics_controller_1 = require("./lyrics.controller");
const lyrics_service_1 = require("./lyrics.service");
describe('LyricsController', () => {
    let lyricsController;
    let lyricsService;
    before(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({
            controllers: [lyrics_controller_1.LyricsController],
            providers: [lyrics_service_1.LyricsService],
        }).compile();
        lyricsService = moduleRef.get(lyrics_service_1.LyricsService);
        lyricsController = moduleRef.get(lyrics_controller_1.LyricsController);
    });
    describe('getLyricsContent', async () => {
        let res;
        before(async () => {
            res = await lyricsService.getLyricsContent('un21010602');
        });
        it('should return undefined', () => {
            (0, chai_1.expect)(res.error).to.be.undefined;
        });
        it('should return "YOASOBI"', () => {
            (0, chai_1.expect)(res.data.artist).to.be.equal('YOASOBI');
        });
        it('should return "怪物"', () => {
            (0, chai_1.expect)(res.data.title).to.be.equal('怪物');
        });
    });
});
//# sourceMappingURL=lyrics.controller.test.js.map