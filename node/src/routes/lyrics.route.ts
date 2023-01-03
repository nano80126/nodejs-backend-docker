import { RouteOptions } from 'fastify';
import { getLyrics } from '../controllers/lyrics.controller';
import { LyricsSearchRequest } from '../types/lyrics';

const routes: RouteOptions[] = [
	{
		method: 'GET',
		url: '/lyrics',
		handler: getLyrics,
		schema: {
			querystring: {
				artist: { type: 'string' },
				song: { type: 'string' },
			},
		},
	},
	{
		method: 'GET',
		url: '/lyric/:key',
		handler: function (req, rep) {
			//
		},
	},
];

export default routes;
