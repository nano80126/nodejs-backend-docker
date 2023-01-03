import { RouteOptions } from 'fastify';

import { ping, pingPost, pingDelete, pingPut } from '../controllers/ping.controller';

const routes: RouteOptions[] = [
	{
		method: 'GET',
		url: '/ping',
		handler: ping,
	},
	{
		method: 'GET',
		url: '/ping/:id',
		handler: ping,
	},
	{
		method: 'POST',
		url: '/ping/:id',
		handler: pingPost,
	},
	{
		method: 'DELETE',
		url: '/ping/:id',
		handler: pingDelete,
	},
	{
		method: 'PUT',
		url: '/ping/:id',
		handler: pingPut,
	},
	{
		method: 'PATCH',
		url: '/ping/:id',
		handler: pingPut,
	},
];

export default routes;
