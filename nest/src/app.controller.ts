import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { AppService } from './app.service';
import { ApiKeyAuthGuard } from './auth/guard/apiKey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('api')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/:name')
	getHello(@Res() reply: FastifyReply, @Param('name') param: string) {
		const res = this.appService.getHello(param);
		reply.status(200).send(res);
	}
}
