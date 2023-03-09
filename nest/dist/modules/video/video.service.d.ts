import { youtube_v3 } from '@googleapis/youtube';
import { VideoInfoResDTO, VideoThumbnailDto } from './dtos/video.interface';
export declare class VideoService {
    yt: youtube_v3.Youtube;
    constructor();
    getSearchList(queryString: string, pageToken?: string): Promise<{
        error?: Error;
        data?: youtube_v3.Schema$SearchListResponse;
    }>;
    getVideoInfo(videoID: string): Promise<{
        error?: Error;
        data?: VideoInfoResDTO;
    }>;
    getVideoThumbnail(videoID: string): Promise<{
        error?: Error;
        data?: VideoThumbnailDto;
    }>;
    saveVideo(): Promise<void>;
}
