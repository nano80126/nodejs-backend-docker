import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import cheerioModule from 'cheerio';
import moment, { utc } from 'moment';
import { MoreThan, Repository } from 'typeorm';

import { SearchLyricsContentResDto, SearchLyricsResDto } from './dtos/lyrics.interface';
import { Lyrics, SearchRecord } from './lyrics.entity';

@Injectable()
export class LyricsService {
	constructor(
		@InjectRepository(Lyrics)
		private lyricsListRepository: Repository<Lyrics>,

		@InjectRepository(SearchRecord)
		private searchRecordRepository: Repository<SearchRecord>,
	) {}

	//#region 爬蟲爬取歌詞列表
	/**
	 * 爬蟲爬取歌詞列表
	 * @param artist 歌手
	 * @param song 歌曲名
	 */
	async getLyricsList(artist: string, song: string): Promise<SearchLyricsResDto[] | string> {
		try {
			const dom = await axios.get('https://utaten.com/lyric/search', {
				headers: {},
				responseType: 'json',
				responseEncoding: 'utf8',
				params: {
					sort: null,
					artist_name: artist,
					title: song,
					show_artist: 1,
				},
			});

			// 拆解 DOM
			const $ = cheerioModule.load(dom.data);
			const title = $('body div#container > div#contents > main h2.contentBox__title').first();
			const table = title.next('div.contentBox__body').children('table');
			const trs = table.children('tbody').children('tr');

			const list: SearchLyricsResDto[] = [];
			for (let i = 0; i < trs.length; i++) {
				if (trs.eq(i).children('td').length >= 2) {
					const td1 = trs.eq(i).children('td:first');
					const td2 = td1.next('.lyricList__beginning');

					const pTitle = td1.find('> p.searchResult__title > a');
					const pName = td1.find('> p.searchResult__name > a');

					const tTitle = pTitle.text().trim();
					const tName = pName.text().trim();
					const tHref = pTitle.attr('href');
					const tID = /(?<=^\/lyric\/)[a-zA-Z]{2}\d{8}(?=\/$)/g.exec(tHref)?.[0];
					const beginning = td2.children('a').text().trim();
					// const pTitle = trs.eq(i).children('td:first').find('> p.searchResult__title > a');
					// const pName = trs.eq(i).children('td:nth-child(2)').find('> p.searchResult__name > a');
					list.push({
						id: list.length + 1,
						title: tTitle,
						artist: tName,
						lyricsUrl: tHref || '',
						lyricsID: tID || '',
						lyricsShort: beginning,
					});
				}
			}
			return list;
		} catch (err) {
			return err;
		}
	}
	//#endregion

	//#region 儲存搜尋紀錄
	/**
	 * create search lyrics record
	 * @param artist 歌手
	 * @param song 歌曲名
	 * @returns
	 */
	async createSearchRecord(artist: string, song: string) {
		try {
			const record = this.searchRecordRepository
				.createQueryBuilder()
				.insert()
				.into(SearchRecord)
				.values([
					{
						song,
						artist,
					},
				])
				.orUpdate(['update_time'], ['song', 'artiest'])
				.execute();

			return record;
			// return await this.searchRecordRepository(record);

			// return await this.searchRecordRepository.upsert(
			// 	{
			// 		song: song,
			// 		artist: artist,
			// 		update_time: () => 'CURRENT_TIMESTAMP',
			// 	},
			// 	['song', 'artist'],
			// );
		} catch (error) {
			return error as Error;
		}
	}
	//#endregion

	//#region 查詢搜尋紀錄
	/**
	 * get search records
	 * @param days
	 * @param limit
	 * @returns
	 */
	async getSearchRecords(days = 30, limit = 5) {
		try {
			// const records = await this.searchRecordRepository.find({
			// 	select: ['id', 'artist', 'song', 'update_time', 'insert_time'],
			// 	where: {
			// 		update_time: MoreThan(moment().add(-days, 'day').startOf('day').toDate()),
			// 	},
			// 	order: {
			// 		update_time: 'DESC',
			// 	},
			// 	take: limit,
			// });
			console.log(moment().add(-days, 'day').startOf('day').toDate());

			const records = await this.searchRecordRepository
				.createQueryBuilder('s')
				// .select('searchRecord')
				// .from(SearchRecord, 'u')
				.where('s.update_time >= :update_time', {
					update_time: moment().add(-days, 'day').startOf('day').toDate(),
				})
				.take(limit)
				.select(['s.artist', 's.song', 's.update_time'])
				.orderBy('s.update_time', 'DESC')
				// .getSql();
				.getMany();

			console.log(records);

			// console.log('------------------');

			// records.forEach((e) => {
			// 	console.log(e.insert_time, e.artist, e.song);
			// 	console.log(moment(e.insert_time).format('YYYY-MM-DD HH:mm:ss'));
			// });

			return records;
		} catch (error) {
			return error;
		}
	}
	//#endregion

	/**
	 * 爬蟲爬取歌詞內容
	 * @param lyricsKey 歌詞 ID
	 * @returns
	 */
	async getLyricsContent(lyricsKey: string) {
		const result: { error?: Error; data?: SearchLyricsContentResDto } = {};

		try {
			const url = `https://utaten.com/lyric/${lyricsKey}/`;

			const dom = await axios.get(url, {
				headers: {},
				responseType: 'json',
				responseEncoding: 'utf8',
			});

			const $ = cheerioModule.load(dom.data);
			const main = $('body div#container > div#contents > main > article').first();
			const divTitle = main.children('div.newLyricTitle');
			const h2Title = divTitle.children('h2.newLyricTitle__main');
			h2Title.find('span').remove();
			const tTitle = h2Title.text().trim();
			const divArtist = main.children('div.lyricData');
			const tArtiest = divArtist
				.children('div.lyricData__main')
				.children('dl.newLyricWork')
				.find('h3 > a')
				.text()
				.trim();

			const lyricsBody = main.children('div.lyricBody');
			const lyricsContent = lyricsBody.children('.medium').children('.hiragana').html();

			Object.assign(result, {
				data: {
					artist: tArtiest,
					title: tTitle,
					lyricsKey: lyricsKey,
					lyrcisUrl: `/lyric/${lyricsKey}/`,
					lyrics: lyricsContent,
				},
			});
		} catch (err) {
			result.error = err;
		}
		return result;
	}

	// #region
	/**
	 * 儲存歌詞內容進資料庫
	 * @param lyrics_id 歌詞ID
	 * @param artist 演唱者
	 * @param song 歌名
	 * @param lyrics 歌詞內容
	 * @returns
	 */
	async saveLyricsContent(lyrics_key: string, artist: string, song: string, lyricsContent: string) {
		try {
			const lyrics = new Lyrics();
			lyrics.lyrics_key = lyrics_key;
			lyrics.artist = artist;
			lyrics.song = song;
			lyrics.lyrics = lyricsContent;
			return await lyrics.save();
		} catch (error) {
			return error;
		}
	}

	/** */
	async updateLyrics(lyrics_id: string, video_ids: string[]) {
		//

		return;
	}

	/**
	 * 從資料庫取得歌詞
	 * @param lyrics_id 歌詞ID
	 * @returns
	 */
	async getLyrics(lyrics_id: string) {
		return '';
	}

	// #endregion
}
