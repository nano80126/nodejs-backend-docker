import { Controller, Req, Res, Query, Param, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { LyricsService } from '@/services/lyrics.service';
import { SearchLyricsDto, SearchLyricsRecordDto } from '@/abstract/interface/lyrics.interface';
import { Body, Get, Post } from '@nestjs/common/decorators';

@Controller('lyrics')
export class LyricsController {
	constructor(private readonly lyricsService: LyricsService) {}

	@Get()
	async getLyricsList(@Res() res: FastifyReply, @Query() searchLyricsDot: SearchLyricsDto) {
		const { artist, title } = searchLyricsDot;
		const result = await this.lyricsService.getLyricsList(artist, title);

		if (result.error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
		} else {
			await this.lyricsService.saveSearchRecord(artist, title);
			return res.status(HttpStatus.OK).send(result);
		}
	}

	@Post()
	async createLyricsRecord(@Body() dto: SearchLyricsRecordDto) {
		const { artist, title } = dto;
		return await this.lyricsService.saveSearchRecord(artist, title);
	}

	@Get('/:lyricsID')
	async getLyricsContent(@Res() reply: FastifyReply, @Param('lyricsID') id: string) {
		const res = await this.lyricsService.getLyricsContent(id);

		return reply.status(200).send(res);
	}
}
