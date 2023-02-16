import { ApiProperty } from '@nestjs/swagger';

export enum SearchType {
	/**歌詞搜尋 */
	Lyrics = 'lyrics',
	/**履歷搜尋 */
	Record = 'record',
	/**YouTube搜尋 */
	YouTube = 'youtube',
}

export enum OrderType {
	asc = 'asc',
	desc = 'desc',
}

class BaseSearchDto {
	@ApiProperty({ readOnly: true, required: true, description: '搜尋種類' })
	type: SearchType;
}

class SearchLyricsDto extends BaseSearchDto {
	readonly type: SearchType = SearchType.Lyrics;
	@ApiProperty({ required: true, maxLength: 20, description: '' })
	title: string;
	@ApiProperty({ required: true, maxLength: 20, description: '' })
	artist: string;
}

class SearchRecordDto extends BaseSearchDto {
	readonly type: SearchType = SearchType.Record;
	@ApiProperty({ required: true, maximum: 10, description: '' })
	maxCount: number;
	@ApiProperty({ required: false, description: '排序' })
	order: OrderType = OrderType.desc;
}

class SearchYouTubeDto extends BaseSearchDto {
	readonly type: SearchType = SearchType.YouTube;
	@ApiProperty({ required: true, maxLength: 50, description: '搜尋關鍵字' })
	keyword: string;
}

export type SearchDto = SearchLyricsDto | SearchRecordDto | SearchYouTubeDto;
