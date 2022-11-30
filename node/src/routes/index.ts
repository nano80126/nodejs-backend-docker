import { RouteOptions } from 'fastify';
import { getList, getSingleList, getListCards } from '../controllers/listController';

const routes: RouteOptions[] = [
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
