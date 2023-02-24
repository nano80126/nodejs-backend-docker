import { Test, TestingModule } from '@nestjs/testing';

import { LyricsController } from '@/controllers/lyrics.controller';
import { LyricsService } from '@/services/lyrics.service';
import { expect } from 'chai';
import { CrawlLyricsResponseDto } from '@/abstract/interface/lyrics.interface';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Lyrics } from '@/entities/lyrics.entity';

// "test": "mocha -r ts-node/register -r tsconfig-paths/register",

describe('LyricsController', () => {
	let lyricsController: LyricsController;
	let lyricsService: LyricsService;

	/**建立 Module */
	before(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [LyricsController],
			providers: [LyricsService],
		}).compile();

		lyricsService = moduleRef.get<LyricsService>(LyricsService);
		lyricsController = moduleRef.get<LyricsController>(LyricsController);
	});

	describe('getLyricsContent', async () => {
		let res: { error?: Error; data?: CrawlLyricsResponseDto };

		// 這個 before 會早於外層beforeEach
		/**抓取爬蟲結果 */
		before(async () => {
			res = await lyricsService.getLyricsContent('un21010602');
		});

		it('should return undefined', () => {
			// const res = await lyricsService.getLyricsContent('un21010602');
			expect(res.error).to.be.undefined;
		});

		it('should return "YOASOBI"', () => {
			// const res = await lyricsService.getLyricsContent('un21010602');
			expect(res.data.artist).to.be.equal('YOASOBI');
		});

		it('should return "怪物"', () => {
			// const res = await lyricsService.getLyricsContent('un21010602');
			expect(res.data.title).to.be.equal('怪物');
		});
	});
});

// describe('test suite', () => {
// 	before(() => {
// 		console.log('    >>> outer before all');
// 	});

// 	after(() => {
// 		console.log('    <<< outer after all');
// 	});

// 	beforeEach(() => {
// 		console.log('      >>> outer before each');
// 	});

// 	afterEach(() => {
// 		console.log('      <<< outer after each');
// 	});

// 	describe('# nested test suite', () => {
// 		before(() => {
// 			console.log('      >>> # nested before all');
// 		});

// 		after(() => {
// 			console.log('      <<< # nested after all');
// 		});

// 		beforeEach(() => {
// 			console.log('      >>> # nested before each');
// 		});

// 		afterEach(() => {
// 			console.log('      <<< # nested after each');
// 		});

// 		it('nested test', () => {
// 			//
// 		});
// 	});

// 	it('test', () => {
// 		//
// 	});
// });
