/**搜尋歌詞列表 REQ DTO */
export class SearchLyricsDto {
	artist: string;
	title: string;
}

export class SearchLyricsRecordDto extends SearchLyricsDto {
	insertTime: Date;
}

/**搜尋歌詞列表 REP DTO */
export class SearchLyricsResponseDto extends SearchLyricsDto {
	id: number;
	lyricsUrl: string;
	lyricsID: string;
	lyricsShort: string;
}

/**歌詞爬蟲 REQ DTO */
export class CrawlLyricsResponseDto {
	artist: string;
	title: string;
	lyricsID: string;
	lyrcisUrl: string;
	lyricsContent: string;
}
