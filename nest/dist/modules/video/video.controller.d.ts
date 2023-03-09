import { FastifyReply } from 'fastify';
import { VideoSaveReqDTO, VideoSearchListDto } from './dtos/video.interface';
import { VideoService } from './video.service';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    getVideoSearchList(res: FastifyReply, query: VideoSearchListDto): Promise<never>;
    getVideoInformation(res: FastifyReply, videoID: string): Promise<never>;
    getVideoThumbnail(res: FastifyReply, videoID: string): Promise<never>;
    saveYoutTube(res: FastifyReply, saveYouTubeReqDto: VideoSaveReqDTO): Promise<void>;
}
