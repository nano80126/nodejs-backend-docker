import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { expect } from 'chai';

describe('UsersController', () => {
	let controller: UsersController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
		}).compile();

		controller = module.get<UsersController>(UsersController);
	});

	it('should be defined', () => {
		expect(controller).not.to.be.undefined;
	});
});
