import { BaseEntity } from 'typeorm';
import { Video } from '@/modules/video/entities/video.entity';
export declare class SearchRecord extends BaseEntity {
    id: number;
    song: string;
    artist: string;
    'update_time': Date;
    'insert_time': Date;
}
export declare class Lyrics extends BaseEntity {
    id: number;
    lyrics_key: string;
    videos: Video[];
    artist: string;
    song: string;
    lyrics: string;
    'update_time': Date;
    'insert_time': Date;
}
