import { FastifyReply, FastifyRequest } from 'fastify';
import { LyricsCrawled } from '../api/search';
import List from '../models/listSchema';

export async function ping(req: FastifyRequest, reply: FastifyReply) {
	try {
		console.log(req.params);
		console.log(req.query);
		// reply.status(200).send('pong\n');
		return 'pong\r';
	} catch (err) {
		console.log(err);
	}
}

export async function getList() {
	try {
		const list = await List.find();
		return list;
	} catch (err) {
		console.log(`1111 ${err}`);
	}
}

export async function getSingleList(req: FastifyRequest, reply: FastifyReply) {
	try {
		const list = await List.findById(0);
		return list;
	} catch (err) {
		console.log(`2222 ${err}`);
	}
}

export async function getListCards(req: FastifyRequest, reply: FastifyReply) {
	try {
		console.log(req.body);
		console.log(req.query);
		console.log(req.params);

		const array: LyricsCrawled[] = [];

		for (let i = 0; i < 10; i++) {
			array.push({
				artist: String.fromCharCode(65 + i),
				title: `${String.fromCharCode(48 + 2 * i)}`,
				lyricsUrl: 'localhost',
				lyricsKey: '123',
				lyrics: '5555',
			});
		}
		reply.status(200).send(array);
	} catch (err) {
		console.log(err);
	}
}
