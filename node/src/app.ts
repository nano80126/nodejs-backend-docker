import fastify from 'fastify';
// import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

// import fastifyStatic from '@fastify/static';
import fastifyCors from '@fastify/cors';
import * as dotenv from 'dotenv';
// import path from 'path';

const server = fastify({ logger: false }).withTypeProvider<TypeBoxTypeProvider>();
// 載入 .env
dotenv.config();
// 取得 port
const port: number = Number(process.env.PORT) || 3000;
// 註冊 static 路徑
// server.register(fastifyStatic, {
// 	root: path.join(__dirname, '../frontend'),
// 	prefix: '/',
// });
// 註冊 cors
server.register(fastifyCors, {
	origin: '*',
	// origin: 'http://localhost',
	// origin: (origin, callback) => {
	// 	const hostname = new URL(origin).hostname;

	// 	if (hostname === 'localhost') {
	// 		callback(null, true);
	// 		return;
	// 	}
	// 	callback(new Error('Not allowed'), false);
	// },
	methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	// credentials: true
});

// server.get(
// 	'/route',
// 	{
// 		schema: {
// 			querystring: {
// 				type: 'object',
// 				properties: {
// 					a: { type: 'string' },
// 					b: { type: 'number' },
// 				},
// 				required: ['a', 'b'],
// 			},
// 		},
// 	},
// 	(req, rep) => {
// 		const { a, b } = req.query;
// 	},
// );

// server.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
// 	// reply.raw.setHeader("Access-Control-Allow-Origin", "*");
// 	// return reply.header("Access-Control-Allow-Origin", "*").sendFile("index.html");
// 	// res.sendFile('F:\\projects\\docker-vite\\vuetify-project\\dist');
// 	// const stream = fs.createReadStream(path.resolve('./dist'), 'utf-8');
// 	return reply.sendFile('index.html');
// });

// server.get('/ping', async (req: FastifyRequest, reply: FastifyReply) => {
// 	return 'pong\r';
// });

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
