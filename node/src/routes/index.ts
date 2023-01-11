import { RouteOptions, FastifyRequest, FastifyReply } from 'fastify';
import { server } from '../app';
// import { ping } from '../controllers/ping.controller';
// import { getList, getSingleList, getListCards } from '../controllers/list.controller';
// import { searchYT } from '../controllers/search.controller';

import '../repositories/';

import pingRoutes from './ping.route';
import lyricsRoutes from './lyrics.route';
import listRoutes from './list.route';
import searchRoutes from './search.route';

const routes: RouteOptions[] = [];

routes.push(...pingRoutes);
routes.push(...lyricsRoutes);
routes.push(...listRoutes);
routes.push(...searchRoutes);

routes.forEach((r) => {
	server.route(r);
});

// server.get<{
// 	Params: {
// 		foo: string;
// 	};
// 	Querystring: {
// 		foo: string;
// 	};
// }>(
// 	'/auth',
// 	{
// 		schema: {
// 			querystring: {
// 				type: 'object',
// 				properties: {
// 					foo: {
// 						type: 'string',
// 					},
// 				},
// 			},
// 		},
// 	},
// 	async (req, rep) => {
// 		const { foo } = req.query;
// 	},
// );

export default routes;
