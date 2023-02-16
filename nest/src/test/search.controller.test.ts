import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from '@/controllers/search.controller';
import { expect } from 'chai';

describe('SearchController', () => {
	let controller: SearchController;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [SearchController],
		}).compile();

		controller = moduleRef.get<SearchController>(SearchController);
	});

	// it('should be defined', () => {
	// 	expect(controller).to.be.;
	// });
});
