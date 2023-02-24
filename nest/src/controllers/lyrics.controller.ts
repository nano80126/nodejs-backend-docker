import { Controller, Req, Res, Query, Param, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { LyricsService } from '@/services/lyrics.service';
import { SearchLyricsReqDTO, SaveLyricsReqDTO, UpdateLyricsReqDTO } from '@/abstract/interface/lyrics.interface';
import { Get, Body, Post, Patch, HttpCode } from '@nestjs/common/decorators';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { resolveSoa } from 'dns';
import { STATUS_CODES } from 'http';

@ApiTags('Lyrics')
@Controller('lyrics')
export class LyricsController {
	constructor(private readonly lyricsService: LyricsService) {}

	@ApiOkResponse({ status: HttpStatus.OK, description: 'get lyrics list successfully' })
	@Get()
	async getLyricsList(@Res() res: FastifyReply, @Query() searchLyricsDot: SearchLyricsReqDTO) {
		const { artist, title } = searchLyricsDot;
		const result = await this.lyricsService.getLyricsList(artist, title);

		if (result.error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result.error);
		} else {
			// await this.lyricsService.saveSearchRecord(artist, title);
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

	@ApiOkResponse({ status: HttpStatus.CREATED, description: 'save lyrics content successfully' })
	@Post()
	async saveLyrics(@Res() res: FastifyReply, @Body() saveLyricsReqDTO: SaveLyricsReqDTO) {
		const { lyrics_key, artist, song, lyrics } = saveLyricsReqDTO;
		const result = await this.lyricsService.saveLyrics(lyrics_key, artist, song, lyrics);

		if ('errno' in result) {
			res.status(HttpStatus.BAD_REQUEST).send(result);
		} else {
			res.status(HttpStatus.OK).send(result);
		}
	}

	@ApiOkResponse({ status: HttpStatus.OK })
	@Patch()
	async updateLyrics(@Res() res: FastifyReply, @Body() updateLyricsReqDTO: UpdateLyricsReqDTO) {
		console.log(updateLyricsReqDTO);

		res.status(HttpStatus.OK).send(123);
	}
}
