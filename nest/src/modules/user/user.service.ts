import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { DataSource, DeleteResult, Repository } from 'typeorm';

import { RefreshToken } from './entities/refreshToken.entify';
import { User } from './entities/users.entity';

import { RedisService } from '../redis.service';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>, // @InjectRepository(RefreshToken) // private refreshTokenRepository: Repository<RefreshToken>,

		@InjectRepository(RefreshToken)
		private refreshTokenRepository: Repository<RefreshToken>,

		private readonly redisService: RedisService,

		private dataSource: DataSource,
	) {}

	async checkAccountExist(account: string) {
		return await this.userRepository.exist({
			where: {
				account: account,
			},
		});
	}

	async createUser(account: string, password: string) {
		const queryRunner = this.dataSource.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const user = new User();
			user.account = account;
			user.password = await hash(password, 10);
			user.password_masked = password.padEnd(20, '*').substring(0, 4).padEnd(12, '*');
			const userCreatedResponse = await queryRunner.manager.save(user);

			const token = new RefreshToken();
			token.user = userCreatedResponse;
			const tokenCreatedResponse = await queryRunner.manager.save(token);

			await queryRunner.commitTransaction();

			return tokenCreatedResponse;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new BadRequestException(error.message);
		} finally {
			await queryRunner.release();
		}
	}

	async updateUser(id: number) {
		const user = await this.userRepository.findOneBy({ id: id });

		user.save();
	}

	async findOneUser(account: string): Promise<User> {
		return this.userRepository.findOne({
			where: {
				account: account,
			},
			select: ['id', 'account', 'password', 'password_masked', 'create_time', 'update_time'],
		});
	}

	async findAllUsers() {
		return (
			this.userRepository
				.createQueryBuilder('users')
				// .select(['users.id', 'users.account', 'users.update_time', 'users.create_time'])
				.getMany()
		);

		// return this.userRepository.find();
	}

	/**軟刪除 使用者 */
	async removeUser(user_id: number) {
		const user = await this.userRepository.findOneBy({ id: user_id });
		return user.softRemove();
	}

	/**
	 * 更新 refresh token
	 * @param userId 使用者 ID
	 * @param newToken 新 Refresh Token
	 * @param expireTime 過期時間
	 * @returns
	 */
	async updateRefreshToken(userId: number, newToken: string, expireTime: Date) {
		const builder = this.refreshTokenRepository
			.createQueryBuilder('r')
			.leftJoin('r.user', 'u')
			.where('r.user_id = :userId', { userId })
			.select(['r.id', 'r.user_id', 'r.expire_time', 'r.update_time']);
		const token = await builder.getOne();

		token.token = newToken;
		token.expire_time = expireTime;
		token.update_time = null;
		return token.save();
	}
}
