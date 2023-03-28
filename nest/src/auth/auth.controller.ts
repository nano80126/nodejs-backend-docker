import { IncomingHttpHeaders } from 'http';

import { Body, Controller, HttpStatus, Param, Query, Req, Res } from '@nestjs/common';
import { Get, Headers, Patch, Post, Request, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
		//
	}

	@Get()
	async test(@Res() res: FastifyReply) {
		this.authService.test();
		res.status(HttpStatus.OK).send('');
	}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Req() req, @Res() res: FastifyReply) {
		// console.log('req', req);

		console.log('body', req.user);

		const token = await this.authService.createAuthToken((req as any).user);

		return res.status(HttpStatus.OK).send(token);
	}

	@Post()
	async createAccessToken(@Res() res: FastifyReply, @Body() payload: { uid: string }) {
		// console.log(payload);

		const result = await this.authService.createAuthToken(payload);

		res.setCookie('accessToken', result.access_token);
		return res.status(200).send(result);
	}

	@Post('verify')
	async verifyAccessToken(@Res() res: FastifyReply, @Headers() header: IncomingHttpHeaders) {
		const { authorization } = header;
		const auth = authorization.substring('Bearer '.length);
		console.log(authorization);
		console.log(auth);

		const verify = await this.authService.verifyAuthToken(auth);
		console.log(verify);
	}
}
