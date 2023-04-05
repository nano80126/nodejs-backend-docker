import console from 'console';
import { IncomingHttpHeaders } from 'http';

import { Body, Controller, HttpStatus, Param, Query, Req, Res } from '@nestjs/common';
import { Get, Headers, Patch, Post, Request, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';
import moment from 'moment';

import { User } from '@/modules/user/entities/users.entity';

import { SkipJwtToken } from './auth.decorator';
import { AuthService } from './auth.service';
import { validateUserResDto } from './dto/auth.interface';
import { ApiKeyAuthGuard } from './guard/apiKey-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

interface FastifyRequestWithUserAuth extends FastifyRequest {
	user: validateUserResDto & { apiKeyIsValid: boolean };
	authInfo: {
		message: string;
	};
}

@ApiTags('Auth')
@UseGuards(ApiKeyAuthGuard)
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
		//
	}

	@UseGuards(LocalAuthGuard)
	@SkipJwtToken()
	@Post('login')
	async login(@Req() req: FastifyRequestWithUserAuth, @Res() res: FastifyReply) {
		delete req.user.apiKeyIsValid;

		const accessToken = await this.authService.createJwtToken(req.user);
		const refreshToken = await this.authService.createRefreshToken({ id: req.user.id });
		res.status(HttpStatus.OK).setCookie('refresh-token', refreshToken, { httpOnly: true }).send({ accessToken, refreshToken });
	}

	@Post('refresh')
	async refresh(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
		//

		res.status(HttpStatus.OK).send('refresh');
	}

	// @Post("revoke")
	// async revoke()

	// @Post()
	// async createAccessToken(@Res() res: FastifyReply, @Body() payload: { uid: string }) {
	// 	// console.log(payload);

	// 	const result = await this.authService.createAuthToken(payload);

	// 	res.setCookie('accessToken', result.access_token);
	// 	return res.status(200).send(result);
	// }

	// @Post('verify')
	// async verifyAccessToken(@Res() res: FastifyReply, @Headers() header: IncomingHttpHeaders) {
	// 	const { authorization } = header;
	// 	const auth = authorization.substring('Bearer '.length);
	// 	console.log(authorization);
	// 	console.log(auth);

	// 	const verify = await this.authService.verifyAuthToken(auth);
	// 	console.log(verify);
	// }
}
