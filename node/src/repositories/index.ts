import mongoose from 'mongoose';

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
