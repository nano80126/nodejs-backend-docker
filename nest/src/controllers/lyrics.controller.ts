import { Controller, Req, Res, Query, Param, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { LyricsService } from '@/services/lyrics.service';
import { SearchLyricsDto, SearchLyricsRecordDto } from '@/abstract/interface/lyrics.interface';
import { Get, Body, Post } from '@nestjs/common/decorators';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Lyrics')
@Controller('lyrics')
export class LyricsController {
	constructor(private readonly lyricsService: LyricsService) {}

	@ApiOkResponse({ status: HttpStatus.OK, description: 'get lyrics list successfully' })
	@Get()
	async getLyricsList(@Res() res: FastifyReply, @Query() searchLyricsDot: SearchLyricsDto) {
		const { artist, title } = searchLyricsDot;
		const result = await this.lyricsService.getLyricsList(artist, title);

		if (result.error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result.error);
		} else {
			await this.lyricsService.saveSearchRecord(artist, title);
			return res.status(HttpStatus.OK).send(result.data);
		}
	}

	// @Post()
	// async createLyricsRecord(@Body() dto: SearchLyricsRecordDto) {
	// 	const { artist, title } = dto;
	// 	return await this.lyricsService.saveSearchRecord(artist, title);
	// }

	@ApiOkResponse({ status: HttpStatus.OK, description: 'get lyrics content successfully' })
	@Get('/:id')
	async getLyricsContent(@Res() res: FastifyReply, @Param('id') videoID: string) {
		const result = await this.lyricsService.getLyricsContent(videoID);

		if (result.error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result.error);
		} else {
			return res.status(HttpStatus.OK).send(result.data);
		}
	}
}
