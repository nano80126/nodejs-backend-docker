import { RouteOptions } from 'fastify';
import { getList, getSingleList, getListCards } from '../controllers/list.controller';

const routes: RouteOptions[] = [
	{
		method: 'GET',
		url: '/list',
		handler: getList,
	},
	{
		method: 'GET',
		url: '/singleList/:id',
		handler: getSingleList,
	},
	{
		method: 'GET',
		url: '/listCards/:id',
		handler: getListCards,
	},
];

export default routes;
