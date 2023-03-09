import { Repository } from 'typeorm';
import { SearchLyricsContentResDto, SearchLyricsResDto } from './dtos/lyrics.interface';
import { Lyrics, SearchRecord } from './lyrics.entity';
export declare class LyricsService {
    private lyricsListRepository;
    private searchRecordRepository;
    constructor(lyricsListRepository: Repository<Lyrics>, searchRecordRepository: Repository<SearchRecord>);
    getLyricsList(artist: string, song: string): Promise<SearchLyricsResDto[] | string>;
    createSearchRecord(artist: string, song: string): Promise<Error | import("typeorm").InsertResult>;
    getSearchRecords(days?: number, limit?: number): Promise<any>;
    getLyricsContent(lyricsKey: string): Promise<{
        error?: Error;
        data?: SearchLyricsContentResDto;
    }>;
    saveLyricsContent(lyrics_key: string, artist: string, song: string, lyricsContent: string): Promise<any>;
    updateLyrics(lyrics_id: string, video_ids: string[]): Promise<void>;
    getLyrics(lyrics_id: string): Promise<string>;
}
