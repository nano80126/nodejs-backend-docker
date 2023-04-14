// import { app, server } from 'app';
import { Server } from 'http';
import { Server as ioServer } from 'socket.io';
// import io from :Socket

const adminSpace = '/admin';
const userSpace = '/user';
let io: ioServer;

export const initSocketIO = (expressServer: Server) => {
	io = new ioServer(expressServer);

	io.of(adminSpace).on('connection', (socket) => {
		console.log(`one admin connected ${socket.id}`);

		socket.use((packet, next) => {
			if (typeof packet[1] === 'string') {
				packet[1] = JSON.parse(packet[1]);
			}
			next();
		});

		socket.on('disconnected', () => {
			console.log('one admin disconnected');
		});

		socket.on('subscribe', (msg) => {
			console.log(msg);
		});
	});

	io.of(userSpace).on('connection', async (socket) => {
		console.log(`one user connected ${socket.id}`);

		socket.join(['room1', 'room2', 'room3']);

		// const room1 = io.of(userSpace).in('room1');

		// io.in("room1").disconnectSockets()

		socket.use((packet, next) => {
			if (typeof packet[1] == 'string') {
				packet[1] = JSON.parse(packet[1]);
			}
			next();
		});

		socket.on('disconnect', () => {
			console.log('one user disconnected');
		});

		socket.on('subscribe', (msg) => {
			console.log(msg);
		});
	});

	setInterval(async () => {
		const room1 = io.of(userSpace).in('room1');
		const room2 = io.of(userSpace).in('room2');

		const [room1Clients, room2Clients] = [await room1.fetchSockets(), await room2.fetchSockets()];

		console.log(room1Clients.length, room2Clients.length);
	}, 5000);
};

// export const startSocket = () => {
// 	io.on('connection', (socket) => {
// 		console.log('a user connected');
// 		socket.on('subscribe', (msg) => {
// 			console.log(msg);
// 			console.log(socket);
// 		});
// 		socket.on('disconnect', () => {
// 			console.log('user disconnected');
// 		});
// 	});
// };
