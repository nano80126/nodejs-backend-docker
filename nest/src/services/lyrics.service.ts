import { Injectable } from '@nestjs/common';

import axios from 'axios';
import cheerio from 'cheerio';
import { SearchLyricsResponseDto, CrawlLyricsResponseDto } from '@/abstract/interface/lyrics.interface';

@Injectable()
export class LyricsService {
	/**
	 *
	 * @param artist 歌手
	 * @param song 歌曲名
	 */
	async getLyricsList(artist: string, song: string) {
		const result: { error?: Error | null; data: Array<SearchLyricsResponseDto> } = {
			data: [],
		};
		try {
			const opt = {
				sort: null,
				artist_name: artist,
				title: song,
				show_artist: 1,
			};

			const dom = await axios.get('https://utaten.com/lyric/search', {
				headers: {},
				responseType: 'json',
				responseEncoding: 'utf8',
				params: opt,
			});

			// 拆解 DOM
			const $ = cheerio.load(dom.data);
			const title = $('body div#container > div#contents > main h2.contentBox__title').first();
			const table = title.next('div.contentBox__body').children('table');
			const trs = table.children('tbody').children('tr');

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
			result.error = err as Error;
		}
		return result;
	}

	async saveSearchRecord(keyword: string, target: 'title' | 'artist') {
		console.log(keyword, target);
	}

	/**
	 *
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
					lyricsContent: lyricsContent,
				},
			});
		} catch (err) {
			result.error = err as Error;
		}
		return result;
	}
}
