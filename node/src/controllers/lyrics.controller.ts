import console from 'console';
import { FastifyRequest, FastifyReply } from 'fastify';
import { LyricsSearchRequest } from '../types/lyrics';
import lyrics from '../services/lyrics.service';

export async function getLyricsList(req: FastifyRequest, reply: FastifyReply) {
	try {
		const { artist, song } = req.query as LyricsSearchRequest;
		const res = await lyrics.getLyricsList(artist, song);
		return reply.status(200).send(res);
	} catch (err) {
		console.log(err);
	}
}

export async function getLyric(req: FastifyRequest, reply: FastifyReply) {
	try {
		// const { artist, song } = req.query as LyricsSearchRequest;
		// const res = await lyrics.getLyrics(artist, song);
		// return reply.status(200).send(res);
	} catch (err) {
		console.log(err);
	}
}
