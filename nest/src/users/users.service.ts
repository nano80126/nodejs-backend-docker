import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Users } from './users.entity';

import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(Users)
		private userRepository: Repository<Users>,
	) {}

	async createOne(username: string, password: string) {
		const hashcode = await bcrypt.hash(password, 10);

		return this.userRepository.save({
			username: username,
			password: hashcode,
			password_masked: password.substring(0, 4) + '********',
		});
	}

	// async findOne(user)
	async findOne(username: string) {
		return this.userRepository.findOne({
			where: {
				username: username,
			},
		});
	}
}
