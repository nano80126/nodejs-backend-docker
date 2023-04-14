import { Controller, Get, Param, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { AppService } from './app.service';

@Controller('api')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/:name')
	getHello(@Res() res: Response, @Param('name') param: string) {
		const result = this.appService.getHello(param);
		res.status(200).send(result);
	}
}
