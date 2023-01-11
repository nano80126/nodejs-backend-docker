import { Controller, Get, Req, Res, Query, Param } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { LyricsService } from '@/services/lyrics.service';
import { SearchLyrcisDto } from '@/abstract/interface/lyrics.interface';

@Controller('lyrics')
export class LyricsController {
	constructor(private readonly lyricsService: LyricsService) {}

	@Get()
	async getLyricsList(@Res() reply: FastifyReply, @Query() searchLyricsDot: SearchLyrcisDto) {
		const { artist, title } = searchLyricsDot;
		const res = await this.lyricsService.getLyricsList(artist, title);

		console.log(artist, title);

		if (!res.error) {
			const save = await this.lyricsService.saveSearchRecord(title, 'title');
		} else {
			//
		}

		return reply.status(200).send(res);
	}

	@Get('/:lyricsID')
	async getLyricsContent(@Res() reply: FastifyReply, @Param('lyricsID') id: string) {
		const res = await this.lyricsService.getLyricsContent(id);

		return reply.status(200).send(res);
	}
}
