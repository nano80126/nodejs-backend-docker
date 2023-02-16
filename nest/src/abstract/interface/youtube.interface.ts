// import { youtube_v3 } from '@googleapis/youtube';

/**搜尋歌詞列表 REQ DTO */
export class YouTubeSearchListDTO {
	queryString: string;
	pageToken?: string;
}

export class YouTubeInfoResDTO {
	definition: 'HD' | 'SD';
	dimension: '2D' | '3D';
	duration: string;
	embeddable: boolean;
}

export class YouTubeThumbnailDTO {
	url: URL;
	width: number;
	height: number;
}
