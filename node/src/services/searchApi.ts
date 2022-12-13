import { server } from '../app';
import mongoose from 'mongoose';
// import { LyricsCrawled } from '../api/search';
import routes from '../routes/';

mongoose
	.connect('mongodb://mongo:27017/elecrawler', {
		user: 'keliduan',
		pass: 'sakuraha',
	})
	.then(() => {
		console.log('mongodb connected...');
	})
	.catch((err) => {
		console.log(err);
	});

routes.forEach((r) => {
	server.route(r);
});
