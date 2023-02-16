import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from '@/services/search.service';
import { expect } from 'chai';

describe('SearchService', () => {
	let service: SearchService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SearchService],
		}).compile();

		service = module.get<SearchService>(SearchService);
	});

	it('should be defined', () => {
		console.log(service, typeof service);

		expect(service).to.not.undefined;
	});
});
