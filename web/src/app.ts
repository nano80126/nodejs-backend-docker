import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import fastifyStatic from '@fastify/static';
// import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';
import path from 'path';

// import cluster from 'cluster';
// import { cpus } from 'os';

const server = fastify({ logger: false });
// 載入 .env
dotenv.config();
// 取得 port
const port: number = Number(process.env.PORT) || 3000;
// 註冊 static 路徑
server.register(fastifyStatic, {
	root: path.join(__dirname, '../frontend'),
	prefix: '/',
});

server.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
	return reply.status(200).sendFile('index.html');
});

server.get('/ping', async (req: FastifyRequest, reply: FastifyReply) => {
	reply.status(200).send('web pong\n');
});

server.get('/test', async (req: FastifyRequest, reply: FastifyReply) => {
	reply.status(400).send('get test status\n');
});

server.post('/test', async (req: FastifyRequest, reply: FastifyReply) => {
	reply.status(400).send('post test status\n');
});

// server.route({
// 	method: 'GET',
// 	url: '/ping',
// 	handler: async (req: FastifyRequest, reply: FastifyReply) => {
// 		console.log(123);
// 		reply.status(200).send('pong\n');
// 	},
// });

server.listen(
	{
		host: '0.0.0.0',
		port: port,
	},
	(err, address) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		console.log(`Server listening at ${address}`);
	},
);

// import './services/searchApi';

export { server };
