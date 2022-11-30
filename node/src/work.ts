import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';
import path from 'path';
// import fs from 'fs';

const server = fastify({ logger: false });
// 載入 .env
dotenv.config();

const port: number = Number(process.env.PORT) || 3000;

let count = 0;

server.register(fastifyStatic, {
	root: path.join(__dirname, './dist'),
	prefix: '/',
});

server.register(fastifyCors, {
	origin: (origin, callback) => {
		const hostname = new URL(origin).hostname;
		if (hostname === 'localhost') {
			callback(null, true);
			return;
		}
		callback(new Error('Not allowed'), false);
	},
	methods: ['GET', 'POST'],
});

server.get('/', async (req, res) => {
	// res.sendFile("F:\\projects\\docker-vite\vuetify-project\\dist");
	// const stream = fs.createReadStream(path.resolve('./dist'), 'utf-8');
	return res.sendFile('index.html');
	// return res.code(200).type('text/html').send(stream);
});

server.get('/ping', async () => {
	return 'pong\n';
});

server.get('/hello', async (req, res) => {
	console.log(count++);
	console.log(port);
	res.send('hello');
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

		// require('./services/searchApi');
	},
);

process.on('message', (msg) => {
	console.log(`worker on message ${msg}`);
});
// process.send('send from worker');

// 先確認 send 可用
// if (typeof process.send === 'function') {
// 	process.send('123');
// }

import './services/searchApi';

export { server };
