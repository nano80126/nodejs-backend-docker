import { ApiProperty } from '@nestjs/swagger';

/**搜尋歌詞列表 REQ DTO */
export class SearchLyricsReqDto {
	@ApiProperty({ maxLength: 20, required: false, description: '歌手名' })
	artist?: string;
	@ApiProperty({ maxLength: 20, required: false, description: '歌名' })
	title?: string;
}

export class SearchLyricsRecordDto extends SearchLyricsReqDto {
	@ApiProperty()
	insertTime: Date;
}

/**搜尋歌詞列表 REP DTO */
export class SearchLyricsResDto extends SearchLyricsReqDto {
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
export class SearchLyricsContentResDto {
	@ApiProperty({ description: '歌手名' })
	artist: string;
	@ApiProperty()
	title: string;
	@ApiProperty()
	lyricsID: string;
	@ApiProperty()
	lyrcisUrl: string;
	@ApiProperty()
	lyrics: string;
}

/**儲存歌詞 REQ DTO */
export class SaveLyricsReqDto {
	@ApiProperty({ maxLength: 10, required: true, description: '歌詞ID' })
	lyrics_key: string;

	// @ApiProperty({ maxLength: 11, required: false, description: 'video ID' })
	// video_id: string;

	@ApiProperty({ maxLength: 20, required: true, description: '(原)演唱者' })
	artist: string;

	@ApiProperty({ maxLength: 20, required: true, description: '歌曲名' })
	song: string;

	@ApiProperty({ required: true, description: '歌詞' })
	lyrics: string;
}

export class UpdateLyricsReqDTO {}
