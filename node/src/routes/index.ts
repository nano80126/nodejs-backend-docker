import { RouteOptions } from 'fastify';
import { ping, getList, getSingleList, getListCards } from '../controllers/listController';
import { searchYT } from '../controllers/searchController';

const routes: RouteOptions[] = [
	{
		method: 'GET',
		url: '/api/ping/:id',
		handler: ping,
	},
	{
		method: 'GET',
		url: '/api/searchYouTube',
		handler: searchYT,
	},
	{
		method: 'GET',
		url: '/api/list',
		handler: getList,
	},
	{
		method: 'GET',
		url: '/api/singleList/:id',
		handler: getSingleList,
	},
	{
		method: 'GET',
		url: '/api/listCards/:id',
		handler: getListCards,
	},
];

export default routes;
