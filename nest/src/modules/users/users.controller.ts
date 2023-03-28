import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';

import { CreateUserDto } from './dtos/users.interface';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOkResponse({ status: HttpStatus.OK, description: 'get users list successfully' })
	@Get()
	async getUsersList(@Res() res: FastifyReply) {
		try {
			const result = await this.usersService.findAll();

			res.status(HttpStatus.OK).send(result);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST).send(error);
		}
	}

	@Post()
	async createUser(@Res() res: FastifyReply, @Body() createUserDto: CreateUserDto) {
		const { account, password, passwordRepeat } = createUserDto;

		try {
			if (password !== passwordRepeat) {
				return res.status(HttpStatus.BAD_REQUEST).send({
					message: '密碼與密碼確認不符',
				});
			}

			const result = await this.usersService.create(account, password);

			res.status(HttpStatus.OK).send(result);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST).send({
				message: error.message,
			});
		}
	}
}
