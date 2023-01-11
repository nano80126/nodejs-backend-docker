/**搜尋歌詞列表 REQ DTO */
export interface SearchLyrcisDto {
	artist: string;
	title: string;
}

/**搜尋歌詞列表 REP DTO */
export interface SearchLyricsResponseDto extends SearchLyrcisDto {
	id: number;
	lyricsUrl: string;
	lyricsID: string;
	lyricsShort: string;
}

/**歌詞爬蟲 REQ DTO */
export interface CrawlLyricsResponseDto {
	artist: string;
	title: string;
	lyricsID: string;
	lyrcisUrl: string;
	lyricsContent: string;
}
