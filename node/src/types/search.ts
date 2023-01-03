/**爬蟲爬到的歌詞列表 */
export interface LyricsCrawled {
	artist: string;
	title: string;
	lyricsUrl: string;
	lyricsKey: string;
	lyrics: string;
}
