import { Controller, Req, Res, Query, Param, HttpStatus } from '@nestjs/common';
import { Get, Post, Patch, Put, Delete } from '@nestjs/common/decorators';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { FastifyReply } from 'fastify';

import { ListService } from '@/services/list.service';
// import {}

@ApiTags('List')
@Controller('list')
export class ListController {
	constructor(private readonly listService: ListService) {}

	@ApiOkResponse({ status: HttpStatus.OK, description: 'get search records' })
	@Get('records')
	async getSearchRecords(@Res() res: FastifyReply) {
		const result = await this.listService.getSearchRecord();

		if (result.error) {
			res.status(HttpStatus.BAD_REQUEST).send(result.error);
		} else {
			res.status(HttpStatus.OK).send(result.data);
		}
	}
}
