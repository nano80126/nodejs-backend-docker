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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LyricsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const moment_1 = __importDefault(require("moment"));
const typeorm_2 = require("typeorm");
const lyrics_entity_1 = require("./lyrics.entity");
let LyricsService = class LyricsService {
    constructor(lyricsListRepository, searchRecordRepository) {
        this.lyricsListRepository = lyricsListRepository;
        this.searchRecordRepository = searchRecordRepository;
    }
    async getLyricsList(artist, song) {
        try {
            const dom = await axios_1.default.get('https://utaten.com/lyric/search', {
                headers: {},
                responseType: 'json',
                responseEncoding: 'utf8',
                params: {
                    sort: null,
                    artist_name: artist,
                    title: song,
                    show_artist: 1,
                },
            });
            const $ = cheerio_1.default.load(dom.data);
            const title = $('body div#container > div#contents > main h2.contentBox__title').first();
            const table = title.next('div.contentBox__body').children('table');
            const trs = table.children('tbody').children('tr');
            const list = [];
            for (let i = 0; i < trs.length; i++) {
                if (trs.eq(i).children('td').length >= 2) {
                    const td1 = trs.eq(i).children('td:first');
                    const td2 = td1.next('.lyricList__beginning');
                    const pTitle = td1.find('> p.searchResult__title > a');
                    const pName = td1.find('> p.searchResult__name > a');
                    const tTitle = pTitle.text().trim();
                    const tName = pName.text().trim();
                    const tHref = pTitle.attr('href');
                    const tID = /(?<=^\/lyric\/)[a-zA-Z]{2}\d{8}(?=\/$)/g.exec(tHref)?.[0];
                    const beginning = td2.children('a').text().trim();
                    list.push({
                        id: list.length + 1,
                        title: tTitle,
                        artist: tName,
                        lyricsUrl: tHref || '',
                        lyricsID: tID || '',
                        lyricsShort: beginning,
                    });
                }
            }
            return list;
        }
        catch (err) {
            return err;
        }
    }
    async createSearchRecord(artist, song) {
        try {
            const record = this.searchRecordRepository
                .createQueryBuilder()
                .insert()
                .into(lyrics_entity_1.SearchRecord)
                .values([
                {
                    song,
                    artist,
                },
            ])
                .orUpdate(['update_time'], ['song', 'artiest'])
                .execute();
            return record;
        }
        catch (error) {
            return error;
        }
    }
    async getSearchRecords(days = 30, limit = 5) {
        try {
            console.log((0, moment_1.default)().add(-days, 'day').startOf('day').toDate());
            const records = await this.searchRecordRepository
                .createQueryBuilder('s')
                .where('s.update_time >= :update_time', {
                update_time: (0, moment_1.default)().add(-days, 'day').startOf('day').toDate(),
            })
                .take(limit)
                .select(['s.artist', 's.song', 's.update_time'])
                .orderBy('s.update_time', 'DESC')
                .getMany();
            console.log(records);
            return records;
        }
        catch (error) {
            return error;
        }
    }
    async getLyricsContent(lyricsKey) {
        const result = {};
        try {
            const url = `https://utaten.com/lyric/${lyricsKey}/`;
            const dom = await axios_1.default.get(url, {
                headers: {},
                responseType: 'json',
                responseEncoding: 'utf8',
            });
            const $ = cheerio_1.default.load(dom.data);
            const main = $('body div#container > div#contents > main > article').first();
            const divTitle = main.children('div.newLyricTitle');
            const h2Title = divTitle.children('h2.newLyricTitle__main');
            h2Title.find('span').remove();
            const tTitle = h2Title.text().trim();
            const divArtist = main.children('div.lyricData');
            const tArtiest = divArtist.children('div.lyricData__main').children('dl.newLyricWork').find('h3 > a').text().trim();
            const lyricsBody = main.children('div.lyricBody');
            const lyricsContent = lyricsBody.children('.medium').children('.hiragana').html();
            Object.assign(result, {
                data: {
                    artist: tArtiest,
                    title: tTitle,
                    lyricsKey: lyricsKey,
                    lyrcisUrl: `/lyric/${lyricsKey}/`,
                    lyrics: lyricsContent,
                },
            });
        }
        catch (err) {
            result.error = err;
        }
        return result;
    }
    async saveLyricsContent(lyrics_key, artist, song, lyricsContent) {
        try {
            const lyrics = new lyrics_entity_1.Lyrics();
            lyrics.lyrics_key = lyrics_key;
            lyrics.artist = artist;
            lyrics.song = song;
            lyrics.lyrics = lyricsContent;
            return await lyrics.save();
        }
        catch (error) {
            return error;
        }
    }
    async updateLyrics(lyrics_id, video_ids) {
        return;
    }
    async getLyrics(lyrics_id) {
        return '';
    }
};
LyricsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lyrics_entity_1.Lyrics)),
    __param(1, (0, typeorm_1.InjectRepository)(lyrics_entity_1.SearchRecord)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LyricsService);
exports.LyricsService = LyricsService;
//# sourceMappingURL=lyrics.service.js.map