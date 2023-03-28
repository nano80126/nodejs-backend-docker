import { Controller, Get, Param, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { AppService } from './app.service';

@Controller('api')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/:name')
	getHello(@Res() reply: FastifyReply, @Param('name') param: string) {
		const res = this.appService.getHello(param);
		return reply.status(200).send(res);
	}
}
