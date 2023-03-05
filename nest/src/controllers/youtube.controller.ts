import { Controller, Req, Res, Query, Param, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';
// import {} from
import { Body, Get, Post } from '@nestjs/common/decorators';
import { YouTubeSearchListDTO } from '@/abstract/interface/youtube.interface';
import { YouTubeService } from '@/services/youtube.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SaveYouTubeReqDTO } from '@/abstract/interface/youtube.interface';
// import {} from

@ApiTags('YouTube')
@Controller('youtube')
export class YouTubeController {
	constructor(private readonly youtubeService: YouTubeService) {}

	@ApiOkResponse({ status: HttpStatus.OK, description: '' })
	@Get('search')
	async getYouTubeSearchList(@Res() res: FastifyReply, @Query() query: YouTubeSearchListDTO) {
		const { queryString, pageToken } = query;
		const result = await this.youtubeService.getSearchList(queryString, pageToken);

		if (result.error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result.error);
		} else {
			return res.status(HttpStatus.OK).send(result.data);
		}
	}

	@ApiOkResponse({ status: HttpStatus.OK, description: '取得 video contentDetails and status' })
	@Get('info/:id')
	async GetYouTubeVideoInformation(@Res() res: FastifyReply, @Param('id') videoID: string) {
		const id = videoID;
		const result = await this.youtubeService.getVideoInfo(id);

		if (result.error) {
			// 這邊應該要存 log
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result.error);
		} else {
			return res.status(HttpStatus.OK).send(result.data);
		}
	}

	@ApiOkResponse({ status: HttpStatus.OK, description: '取得 video snippet thumbnails' })
	@Get('image/:id')
	async GetYouTubeVideoImage(@Res() res: FastifyReply, @Param('id') videoID: string) {
		const id = videoID;
		const result = await this.youtubeService.getVideoThumbnail(id);

		if (result.error) {
			// 這邊應該要存 log
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result.error);
		} else {
			return res.status(HttpStatus.OK).send(result.data);
		}
	}

	@ApiOkResponse({ status: HttpStatus.OK, description: '' })
	@Post()
	async saveYoutTube(@Res() res: FastifyReply, @Body() saveYouTubeReqDto: SaveYouTubeReqDTO) {
		//
		// const
	}
}
