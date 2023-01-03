import axios from 'axios';
import cheerio from 'cheerio';

import { LyricsObject } from '../types/lyrics';

export async function getLyrics(artist: string, song: string) {
	const result: { error: Error | null; data: Array<LyricsObject> } = {
		error: null,
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
				const href = pTitle.attr('href');
				const tName = pName.text().trim();
				const beginning = td2.children('a').text().trim();
				// const pTitle = trs.eq(i).children('td:first').find('> p.searchResult__title > a');
				// const pName = trs.eq(i).children('td:nth-child(2)').find('> p.searchResult__name > a');
				result.data.push({
					id: result.data.length + 1,
					title: tTitle,
					artist: tName,
					lyricsUrl: href || '',
					lyricsShort: beginning,
				});
			}
		}
	} catch (err) {
		result.error = err as Error;
	}
	return result;
}

export default { getLyrics };
