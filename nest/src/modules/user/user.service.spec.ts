import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { expect } from 'chai';
import { Repository } from 'typeorm';

import { User } from './entities/users.entity';
import { UsersService } from './user.service';

const user1 = {
	account: '123',
	password: '456',
};

describe('UsersService', () => {
	let service: UsersService;
	let repo: Repository<User>;

	// 建立 module
	before(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: getRepositoryToken(User),
					useValue: {
						findOne: () =>
							new Promise((sol) => {
								sol(user1);
							}),
					},
				},
			],
		}).compile();

		service = module.get<UsersService>(UsersService);
		repo = module.get<Repository<User>>(getRepositoryToken(User));
	});

	describe('test', () => {
		it('should be defined', async () => {
			// expect(service).to.be.not;
			const user = await service.findOneUser('123');
			// console.log(user, 456);

			expect(user).to.deep.equal({
				account: '123',
				password: '456',
			});
		});
	});
});