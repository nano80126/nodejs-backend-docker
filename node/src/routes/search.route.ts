import { RouteOptions } from 'fastify';
import { searchYT } from '../controllers/search.controller';

const routes: RouteOptions[] = [
	{
		method: 'GET',
		url: '/searchYT',
		handler: searchYT,
	},
];

export default routes;
