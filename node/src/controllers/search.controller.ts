import { FastifyReply, FastifyRequest } from 'fastify';
import searchItems from '../mock/searchYouTube.json';

async function searchYT(req: FastifyRequest, reply: FastifyReply) {
	try {
		console.log(req.params);
		console.log(req.query);

		reply.status(200).send(searchItems);
	} catch (err) {
		console.log(err);
	}
}

export { searchYT };
