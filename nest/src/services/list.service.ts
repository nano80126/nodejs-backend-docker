import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import axios from 'axios';
import inject from 'light-my-request';
import { SearchRecord } from '@/entities/lyrics.entity';
import { SearchRecordResDTO } from '@/abstract/interface/list.interface';

@Injectable()
export class ListService {
	constructor(
		@InjectRepository(SearchRecord)
		private searchRecordRepository: Repository<SearchRecord>,
	) {} //  @InjectRepository()

	async getSearchRecord() {
		const result: { error?: Error; data?: Array<SearchRecordResDTO> } = {};

		try {
			// const builder = this.searchRecordRepository
			// 	.createQueryBuilder()
			// 	// .from(SearchRecord, 'search_record')
			// 	.select(['id', 'artist', 'song'])
			// 	.orderBy('update_time', 'DESC')
			// 	.limit(3);
			// const data = await builder.execute();

			// console.log(builder.getSql());

			const data = await this.searchRecordRepository.find({
				select: ['artist', 'song'],
				order: {
					update_time: 'DESC',
				},
				take: 3,
			});

			console.log(data);

			result.data = data.map((e) => {
				return {
					id: e.id,
					artist: e.artist,
					song: e.song,
				};
			});
		} catch (err) {
			result.error = err;
		}

		return result;
	}
}
