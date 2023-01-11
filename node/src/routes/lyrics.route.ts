import { RouteOptions } from 'fastify';
import { FastifyRequest } from 'fastify/types/request';
import { getLyricsList } from '../controllers/lyrics.controller';
import { LyricsSearchRequest } from '../types/lyrics';
// import { Static, Type } from '@sinclair/typebox';

const routes: RouteOptions[] = [
	{
		method: 'GET',
		url: '/lyrics-list',
		handler: getLyricsList,
		schema: {
			querystring: LyricsSearchRequest,
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
