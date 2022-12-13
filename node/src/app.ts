import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyCors from '@fastify/cors';
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
	root: path.join(__dirname, './dist'),
	prefix: '/',
});
// 註冊 cors
server.register(fastifyCors, {
	origin: (origin, callback) => {
		const hostname = new URL(origin).hostname;
		console.log(new URL(origin));
		console.log(new URL(origin).hostname);
		console.log(new URL(origin).port);
		console.log(origin);

		if (hostname === 'localhost') {
			callback(null, true);
			return;
		}
		callback(new Error('Not allowed'), false);
	},
	methods: ['GET', 'POST'],
});

server.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
	// res.sendFile('F:\\projects\\docker-vite\\vuetify-project\\dist');
	// const stream = fs.createReadStream(path.resolve('./dist'), 'utf-8');
	// return res.sendFile('index.html');
	return '123';
});

// server.get('/ping', async (req: FastifyRequest, reply: FastifyReply) => {
// 	return 'pong\r';
// });

server.route({
	method: 'GET',
	url: '/ping',
	handler: async (req: FastifyRequest, reply: FastifyReply) => {
		console.log(123);
		reply.status(200).send('pong\n');
	},
});

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

import './services/searchApi';

export { server };
