import { app, io } from 'app';
// import io from app

export const startSocket = () => {
	io.on('connection', (socket) => {
		console.log('a user connected');

		socket.on('subscribe', (msg) => {
			console.log(msg);
			console.log(socket);
		});

		socket.on('disconnect', () => {
			console.log('user disconnected');
		});
	});
};
