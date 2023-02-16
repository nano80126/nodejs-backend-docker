import { Controller, Get, Res, Query, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { SearchService } from '@/services/search.service';
import { SearchType, SearchDto } from '@/abstract/interface/search.interface';

import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Search')
@Controller('search')
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	@ApiOkResponse({ status: HttpStatus.OK, description: '' })
	@Get()
	async name(@Res() res: FastifyReply, @Query() search: SearchDto) {
		const { type } = search;

		switch (type) {
			case SearchType.Lyrics:
				// search as SearchLyricsDto;
				// const { artist } = search;
				break;
			case SearchType.Record:
				// search as searchrecord;

				break;
			case SearchType.YouTube:
				break;
		}

		console.log(type);
		console.log(search);
	}
}
