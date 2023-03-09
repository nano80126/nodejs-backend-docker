import { FastifyReply } from 'fastify';
import { SaveLyricsReqDto, SearchLyricsReqDto } from './dtos/lyrics.interface';
import { LyricsService } from './lyrics.service';
export declare class LyricsController {
    private readonly lyricsService;
    constructor(lyricsService: LyricsService);
    getLyricsSearchRecords(res: FastifyReply): Promise<void>;
    createSearchRecord(res: FastifyReply, searchLyricsReqDto: SearchLyricsReqDto): Promise<void>;
    getLyricsList(res: FastifyReply, searchLyricsReqDto: SearchLyricsReqDto): Promise<void>;
    getLyricsContent(res: FastifyReply, lyricsKey: string): Promise<void>;
    saveLyricsContent(res: FastifyReply, lyricsKey: string, saveLyricsReqDto: SaveLyricsReqDto): Promise<void>;
    deleteLyricsContent(res: FastifyReply, lyricsKey: string): Promise<void>;
}
