import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';

import { SaveLyricsReqDto, SearchLyricsReqDto } from './dtos/lyrics.interface';
import { LyricsService } from './lyrics.service';

@ApiTags('Lyrics')
@Controller('lyrics')
export class LyricsController {
	constructor(private readonly lyricsService: LyricsService) {}

	@ApiOkResponse({ status: HttpStatus.OK, description: 'get lyrics search records successfully' })
	@Get('/search-records')
	async getLyricsSearchRecords(@Res() res: FastifyReply) {
		//
		const result = await this.lyricsService.getSearchRecords(5, 5);

		res.status(HttpStatus.OK).send(result);
	}

	@Post('/search-records')
	async createSearchRecord(@Res() res: FastifyReply, @Body() searchLyricsReqDto: SearchLyricsReqDto) {
		const { artist, title } = searchLyricsReqDto;
		const result = await this.lyricsService.createSearchRecord(artist, title);

		res.status(HttpStatus.CREATED).send(result);
	}

	/**get lyrics list */
	@ApiOkResponse({ status: HttpStatus.OK, description: 'get lyrics list successfully' })
	@Get()
	async getLyricsList(@Res() res: FastifyReply, @Query() searchLyricsReqDto: SearchLyricsReqDto) {
		const { artist, title } = searchLyricsReqDto;

		if (artist === '' && title === '') {
			res.status(HttpStatus.BAD_REQUEST).send({
				message: '歌手與歌曲名皆為空，無法搜尋。',
			});
		}
		try {
			const lyrcisList = await this.lyricsService.getLyricsList(artist, title);
			res.status(HttpStatus.OK).send(lyrcisList);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST).send({
				message: error.message,
			});
		}
	}

	/**get lyrics content */
	@ApiOkResponse({ status: HttpStatus.OK, description: 'get lyrics content successfully' })
	@Get('/:key')
	async getLyricsContent(@Res() res: FastifyReply, @Param('key') lyricsKey: string) {
		const result = await this.lyricsService.getLyricsContent(lyricsKey);

		if (result.error) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result.error);
		} else {
			res.status(HttpStatus.OK).send(result.data);
		}
	}

	/**create lyrics content */
	@ApiOkResponse({ status: HttpStatus.CREATED, description: 'save lyrics content successfully' })
	@Post('/:key')
	async saveLyricsContent(@Res() res: FastifyReply, @Param('key') lyricsKey: string, @Body() saveLyricsReqDto: SaveLyricsReqDto) {
		const { lyrics_key, artist, song, lyrics } = saveLyricsReqDto;
		const result = await this.lyricsService.saveLyricsContent(lyrics_key, artist, song, lyrics);

		if ('errno' in result) {
			res.status(HttpStatus.BAD_REQUEST).send(result);
		} else {
			res.status(HttpStatus.OK).send(result);
		}
	}

	/**delete lyrics content */
	@ApiOkResponse({ status: HttpStatus.NO_CONTENT, description: 'delete lyrics content successfully' })
	@Delete('/:key')
	async deleteLyricsContent(@Res() res: FastifyReply, @Param('key') lyricsKey: string) {
		//
	}

	// @ApiOkResponse({ status: HttpStatus.OK })
	// @Patch()
	// async updateLyrics(@Res() res: FastifyReply, @Body() updateLyricsReqDTO: UpdateLyricsReqDTO) {
	// 	console.log(updateLyricsReqDTO);

	// 	res.status(HttpStatus.OK).send(123);
	// }
}
