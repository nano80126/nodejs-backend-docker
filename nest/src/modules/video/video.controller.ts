import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';

import { VideoSaveReqDTO, VideoSearchListDto } from './dtos/video.interface';
import { VideoService } from './video.service';

// import { VideoService } from './video.service';

@ApiTags('Video')
@Controller('video')
export class VideoController {
	constructor(private readonly videoService: VideoService) {}

	@ApiOkResponse({ status: HttpStatus.OK, description: '' })
	@Get('search')
	async getVideoSearchList(@Res() res: FastifyReply, @Query() query: VideoSearchListDto) {
		const { queryString, pageToken } = query;
		const result = await this.videoService.getSearchList(queryString, pageToken);

		if (result.error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result.error);
		} else {
			return res.status(HttpStatus.OK).send(result.data);
		}
	}

	@ApiOkResponse({ status: HttpStatus.OK, description: '取得 video contentDetails and status' })
	@Get('info/:id')
	async getVideoInformation(@Res() res: FastifyReply, @Param('id') videoID: string) {
		const id = videoID;
		const result = await this.videoService.getVideoInfo(id);

		if (result.error) {
			// 這邊應該要存 log
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result.error);
		} else {
			return res.status(HttpStatus.OK).send(result.data);
		}
	}

	@ApiOkResponse({ status: HttpStatus.OK, description: '取得 video snippet thumbnails' })
	@Get('image/:id')
	async getVideoThumbnail(@Res() res: FastifyReply, @Param('id') videoID: string) {
		const id = videoID;
		const result = await this.videoService.getVideoThumbnail(id);

		if (result.error) {
			// 這邊應該要存 log
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result.error);
		} else {
			return res.status(HttpStatus.OK).send(result.data);
		}
	}

	@ApiOkResponse({ status: HttpStatus.OK, description: '' })
	@Post()
	async saveYoutTube(@Res() res: FastifyReply, @Body() saveYouTubeReqDto: VideoSaveReqDTO) {
		//
		// const
	}
}
