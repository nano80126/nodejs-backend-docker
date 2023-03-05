import { Controller, Req, Res, Query, Param, Body, HttpStatus } from '@nestjs/common';
import { Get, Post, Patch, Headers } from '@nestjs/common/decorators';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '@/services/auth.service';
import { FastifyReply } from 'fastify';
import { IncomingHttpHeaders } from 'http';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
		//
	}

	@Post()
	async createAccessToken(@Res() res: FastifyReply, @Body() payload: { uid: string }) {
		// console.log(payload);

		const result = await this.authService.createAuthToken(payload);

		res.setCookie('accessToken', result);
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
