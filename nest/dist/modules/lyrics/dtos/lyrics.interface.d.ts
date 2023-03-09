export declare class SearchLyricsReqDto {
    artist?: string;
    title?: string;
}
export declare class SearchLyricsRecordDto extends SearchLyricsReqDto {
    insertTime: Date;
}
export declare class SearchLyricsResDto extends SearchLyricsReqDto {
    id: number;
    lyricsUrl: string;
    lyricsID: string;
    lyricsShort: string;
}
export declare class SearchLyricsContentResDto {
    artist: string;
    title: string;
    lyricsID: string;
    lyrcisUrl: string;
    lyrics: string;
}
export declare class SaveLyricsReqDto {
    lyrics_key: string;
    artist: string;
    song: string;
    lyrics: string;
}
export declare class UpdateLyricsReqDTO {
}
