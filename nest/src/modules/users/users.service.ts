import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { DeleteResult, Repository } from 'typeorm';

import { CreateUserDto } from './dtos/users.interface';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(Users)
		private userRepository: Repository<Users>,
	) {}

	async create(account: string, password: string): Promise<Users> {
		const user = new Users();
		user.account = account;
		user.password = await hash(password, 10);
		user.password_masked = password.substring(0, 4).padEnd(12, '*');
		return user.save();
	}

	async findOne(account: string): Promise<Users> {
		return this.userRepository.findOne({
			where: {
				account: account,
			},
			select: ['account', 'password', 'password_masked', 'insert_time', 'update_time'],
		});
	}

	async findAll() {
		return this.userRepository
			.createQueryBuilder('users')
			.select(['users.id', 'users.account', 'users.update_time', 'users.insert_time'])
			.getMany();

		// return this.userRepository.find();
	}

	async remove(id: string): Promise<DeleteResult> {
		return this.userRepository.delete(id);
	}
}
