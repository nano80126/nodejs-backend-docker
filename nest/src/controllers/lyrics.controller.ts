import { Controller, Req, Res, Query, Param, Body, HttpStatus } from '@nestjs/common';
import { Get, Post, Patch } from '@nestjs/common/decorators';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { FastifyReply } from 'fastify';

import { LyricsService } from '@/services/lyrics.service';
import { SearchLyricsReqDTO, SaveLyricsReqDTO, UpdateLyricsReqDTO } from '@/abstract/interface/lyrics.interface';

@ApiTags('Lyrics')
@Controller('lyrics')
export class LyricsController {
	constructor(private readonly lyricsService: LyricsService) {}

	@ApiOkResponse({ status: HttpStatus.OK, description: 'get lyrics list successfully' })
	@Get()
	async getLyricsList(@Res() res: FastifyReply, @Query() searchLyricsDto: SearchLyricsReqDTO) {
		const { artist, title } = searchLyricsDto;

		const result = await this.lyricsService.getLyricsList(artist, title);
		const result2 = await this.lyricsService.saveSearchRecord(artist, title);

		console.log('result2', result2);

		if (result.error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result.error);
		} else {
			return res.status(HttpStatus.OK).send(result.data);
		}
	}

	// @ApiOkResponse({ status: HttpStatus.OK, description: '' })
	// @Get('records')
	// async saveSearchRecord(@Res() res: FastifyReply, @Body() searchLyricsDto: SearchLyricsReqDTO) {
	// const { artist, title } = searchLyricsDto;
	// const result = await this.lyricsService.saveSearchRecord(artist, title);
	// console.log(result);
	// }

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
	async saveLyrics(@Res() res: FastifyReply, @Body() saveLyricsReqDto: SaveLyricsReqDTO) {
		const { lyrics_key, artist, song, lyrics } = saveLyricsReqDto;
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
