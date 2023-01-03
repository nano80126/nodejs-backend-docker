import { FastifyReply, FastifyRequest } from 'fastify';

export async function ping(req: FastifyRequest, reply: FastifyReply) {
	try {
		console.log(`${req.hostname} ${req.method}`);
		console.log(req.body);
		console.log(req.query);
		console.log(req.params);

		return reply.status(200).send(`pong\n ${JSON.stringify(req.params)}\n ${JSON.stringify(req.query)}`);
	} catch (err) {
		console.log(err);
	}
}

export async function pingPost(req: FastifyRequest, reply: FastifyReply) {
	try {
		console.log(`${req.hostname} ${req.method}`);
		console.log(req.body);
		console.log(req.query);
		console.log(req.params);

		return reply.status(200).send(`pong POST\n ${JSON.stringify(req.params)}\n ${JSON.stringify(req.query)}`);
	} catch (err) {
		console.log(err);
	}
}

export async function pingDelete(req: FastifyRequest, reply: FastifyReply) {
	try {
		console.log(`${req.hostname} ${req.method}`);
		console.log(req.body);
		console.log(req.query);
		console.log(req.params);

		return reply.status(200).send(`pong DELETE\n ${JSON.stringify(req.params)}\n ${JSON.stringify(req.query)}`);
	} catch (err) {
		console.log(err);
	}
}

export async function pingPut(req: FastifyRequest, reply: FastifyReply) {
	try {
		console.log(`${req.hostname} ${req.method}`);
		console.log(req.body);
		console.log(req.query);
		console.log(req.params);

		return reply.status(200).send(`pong PUT\n ${JSON.stringify(req.params)}\n ${JSON.stringify(req.query)}`);
	} catch (err) {
		console.log(err);
	}
}

export async function pingPatch(req: FastifyRequest, reply: FastifyReply) {
	try {
		console.log(`${req.hostname} ${req.method}`);
		console.log(req.body);
		console.log(req.query);
		console.log(req.params);

		return reply.status(200).send(`pong PUT\n ${JSON.stringify(req.params)}\n ${JSON.stringify(req.query)}`);
	} catch (err) {
		console.log(err);
	}
}
