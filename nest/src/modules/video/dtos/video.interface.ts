// import { youtube_v3 } from '@googleapis/youtube';

/**video search list request dto */
export class VideoSearchListDto {
	queryString: string;
	pageToken?: string;
}
/**video infomation response dto */
export class VideoInfoResDTO {
	definition: 'HD' | 'SD';
	dimension: '2D' | '3D';
	duration: string;
	embeddable: boolean;
}
/**video thumbnail dto */
export class VideoThumbnailDto {
	url: URL;
	width: number;
	height: number;
}

/**video save request dto */
export class VideoSaveReqDTO {}
