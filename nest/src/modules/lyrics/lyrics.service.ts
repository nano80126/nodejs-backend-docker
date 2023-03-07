import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import axios from 'axios';
import cheerio from 'cheerio';
import { SearchLyricsResponseDto, CrawlLyricsResponseDto } from '@/modules/lyrics/dto/lyrics.interface';
// import { Lyrics } from '@/entities/lyrics.entity';
import { SearchRecord, Lyrics } from './lyrics.entity';

@Injectable()
export class LyricsService {
	constructor(
		@InjectRepository(Lyrics)
		private lyricsListRepository: Repository<Lyrics>,

		@InjectRepository(SearchRecord)
		private searchRecordRepository: Repository<SearchRecord>,
	) {}

	/**
	 * 爬蟲爬取歌詞列表
	 * @param artist 歌手
	 * @param song 歌曲名
	 */
	async getLyricsList(artist: string, song: string) {
		const result: { error?: Error; data?: Array<SearchLyricsResponseDto> } = {};
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
			const $ = cheerio.load(dom.data);
			const title = $('body div#container > div#contents > main h2.contentBox__title').first();
			const table = title.next('div.contentBox__body').children('table');
			const trs = table.children('tbody').children('tr');

			result.data = [];
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
					result.data.push({
						id: result.data.length + 1,
						title: tTitle,
						artist: tName,
						lyricsUrl: tHref || '',
						lyricsID: tID || '',
						lyricsShort: beginning,
					});
				}
			}
		} catch (err) {
			result.error = err;
		}
		return result;
	}

	/**
	 * @param artist 歌手
	 * @param song 歌曲名
	 * @returns
	 */
	async saveSearchRecord(artist: string, song: string) {
		try {
			// return this.searchRecordRespository
			// 	.createQueryBuilder()
			// 	.insert()
			// 	.into(SearchRecord)
			// 	.values({ artist, song })
			// 	.orUpdate(['update_time'], ['song', 'artist'])
			// 	.execute();
			// or .getSql();

			return this.searchRecordRepository.upsert(
				{
					song: song,
					artist: artist,
					update_time: () => 'CURRENT_TIMESTAMP',
				},
				['song', 'artist'],
			);
			// return this.searchRecordRespository.save({
			// 	artist: artist,
			// 	song: song,
			// });
		} catch (error) {
			const { code, errno, sqlState, sqlMessage } = error;
			return { code, errno, sqlState, sqlMessage };
		}
	}

	/**
	 * 爬蟲爬取歌詞內容
	 * @param lyricsID 歌詞 ID
	 * @returns
	 */
	async getLyricsContent(lyricsID: string) {
		const result: { error?: Error; data?: CrawlLyricsResponseDto } = {};

		try {
			const url = `https://utaten.com/lyric/${lyricsID}/`;

			const dom = await axios.get(url, {
				headers: {},
				responseType: 'json',
				responseEncoding: 'utf8',
			});

			const $ = cheerio.load(dom.data);
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
					lyricsID: lyricsID,
					lyrcisUrl: `/lyric/${lyricsID}/`,
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
	async saveLyrics(lyrics_key: string, artist: string, song: string, lyrics: string) {
		try {
			return await this.lyricsListRepository.save({
				lyrics_key,
				artist,
				song,
				lyrics,
			});
		} catch (error) {
			const { code, errno, sqlState, sqlMessage } = error;
			return { code, errno, sqlState, sqlMessage };
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
