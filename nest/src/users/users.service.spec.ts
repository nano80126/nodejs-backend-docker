import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { expect } from 'chai';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
	let service: UsersService;
	// let repo: Repository<Users>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [TypeOrmModule.forFeature([Users])],
			providers: [UsersService],
			exports: [UsersService],
		}).compile();

		// repo = module.get<Repository<Users>>(Repository<Users>);
		service = module.get<UsersService>(UsersService);
	});

	it('should be defined', () => {
		// expect(service).to.be.not;
		// const user = repo.findOne({
		// 	where: {
		// 		username: '123456',
		// 	},
		// });
		// console.log(user);
	});
});
