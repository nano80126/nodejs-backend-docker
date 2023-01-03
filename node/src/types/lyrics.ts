export interface LyricsSearchRequest {
	artist: string;
	song: string;
}

export interface LyricsObject {
	id: number;
	artist: string;
	title: string;
	lyricsUrl: string;
	lyricsShort: string;
}
