import { Lyrics } from '@/modules/lyrics/lyrics.entity';
export declare class Video {
    id: number;
    video_key: string;
    lyrics_id: Lyrics;
    song: string;
    artist: string;
    'update_time': Date;
    'insert_time': Date;
}
