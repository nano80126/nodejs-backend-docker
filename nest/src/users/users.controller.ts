import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { CreateUserDTO } from './dto/users.interface';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async createUser(@Res() res: FastifyReply, @Body() createUserDto: CreateUserDTO) {
		const { username, password, passwordRepeat } = createUserDto;

		if (password !== passwordRepeat) {
			return res.status(HttpStatus.BAD_REQUEST).send({
				message: '密碼與密碼確認不符',
			});
		}

		// this.usersService.createOne(createUserDto);

		res.status(HttpStatus.OK).send('');
	}
}
