import { ApiProperty } from '@nestjs/swagger';

/**搜尋歌詞列表 REQ DTO */
export class SearchLyricsDto {
	@ApiProperty({ maxLength: 20, required: false, description: '歌手名' })
	artist?: string;
	@ApiProperty({ maxLength: 20, required: false, description: '歌名' })
	title?: string;
}

export class SearchLyricsRecordDto extends SearchLyricsDto {
	@ApiProperty()
	insertTime: Date;
}

/**搜尋歌詞列表 REP DTO */
export class SearchLyricsResponseDto extends SearchLyricsDto {
	@ApiProperty()
	id: number;
	@ApiProperty()
	lyricsUrl: string;
	@ApiProperty()
	lyricsID: string;
	@ApiProperty()
	lyricsShort: string;
}

/**歌詞爬蟲 REQ DTO */
export class CrawlLyricsResponseDto {
	@ApiProperty()
	artist: string;
	@ApiProperty()
	title: string;
	@ApiProperty()
	lyricsID: string;
	@ApiProperty()
	lyrcisUrl: string;
	@ApiProperty()
	lyricsContent: string;
}
