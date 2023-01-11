import { Static, Type } from '@sinclair/typebox';

export const LyricsSearchRequest = Type.Object({
	artist: Type.String(),
	song: Type.String(),
});

// export type LyricsSearchRequestType = Static<typeof LyricsSearchRequest>;

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
