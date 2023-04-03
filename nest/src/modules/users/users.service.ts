import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { DeleteResult, Repository } from 'typeorm';

import { RefreshToken } from './entities/refreshToken.entify';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(Users)
		private userRepository: Repository<Users>, // @InjectRepository(RefreshToken) // private refreshTokenRepository: Repository<RefreshToken>,
	) {}

	async checkAccountExist(account: string) {
		return await this.userRepository.exist({
			where: {
				account: account,
			},
		});
	}

	async createUser(account: string, password: string) {
		const user = new Users();
		user.account = account;
		user.password = await hash(password, 10);
		user.password_masked = password.padEnd(20, '*').substring(0, 4).padEnd(12, '*');
		return await user.save();
	}

	async findOneUser(account: string): Promise<Users> {
		return this.userRepository.findOne({
			where: {
				account: account,
			},
			select: ['id', 'account', 'password', 'password_masked', 'insert_time', 'update_time'],
		});
	}

	async findAllUsers() {
		return this.userRepository
			.createQueryBuilder('users')
			.select(['users.id', 'users.account', 'users.update_time', 'users.insert_time'])
			.getMany();

		// return this.userRepository.find();
	}

	async deleteUser(id: string): Promise<DeleteResult> {
		return this.userRepository.delete(id);
	}
}
