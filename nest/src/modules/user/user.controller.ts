import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';

import { SkipApiKey, SkipJwtToken } from '@/auth/auth.decorator';
import { jwtPayloadDto } from '@/auth/dto/auth.interface';

import { CreateUserDto } from './dtos/users.interface';
import { UsersService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {
		// this.logger.setContext(UsersController.name);
	}

	@ApiOkResponse({ status: HttpStatus.OK, description: 'get users list successfully' })
	@Get()
	async getUserList(@Req() req: FastifyRequest & { user: jwtPayloadDto }, @Res() res: FastifyReply) {
		try {
			const result = await this.usersService.findAllUsers();
			res.status(HttpStatus.OK).send(result);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST).send(error);
		}
	}

	@ApiOkResponse({ status: HttpStatus.OK, description: 'get users list successfully' })
	@Get('/:id')
	async getUserDetail(@Req() req: FastifyRequest, @Res() res: FastifyReply, @Param('id') userId: number) {
		console.log('userId', userId);

		// console.log(req.cookies);
		// console.log(req.cookies['access-token']);
		// console.log(req.cookies['refresh-token']);

		res.status(200).send(userId);
	}

	@ApiOkResponse({ status: HttpStatus.CREATED, description: '' })
	@SkipJwtToken()
	@Post()
	async createUser(@Res() res: FastifyReply, @Body() createUserDto: CreateUserDto) {
		const { account, password, passwordRepeat } = createUserDto;

		try {
			if (await this.usersService.checkAccountExist(account)) {
				res.status(HttpStatus.BAD_REQUEST).send({
					state: HttpStatus.BAD_REQUEST,
					message: '此帳號已存在',
				});
				return;
			} else if (password !== passwordRepeat) {
				res.status(HttpStatus.BAD_REQUEST).send({
					state: HttpStatus.BAD_REQUEST,
					message: '密碼與密碼確認不符',
				});
				return;
			} else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(password) == false) {
				res.status(HttpStatus.BAD_REQUEST).send({
					state: HttpStatus.BAD_REQUEST,
					message: '密碼不符合規則，須為8~16碼之大寫、小寫與數字之組合',
				});
				return;
			}

			const result = await this.usersService.createUser(account, password);

			res.status(HttpStatus.OK).send(result);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST).send({
				message: error.message,
			});
		}
	}
}
