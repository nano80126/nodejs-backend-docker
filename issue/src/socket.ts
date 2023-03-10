// import { app, server } from 'app';
import { type } from 'os';
import { Server } from 'http';
import { Server as ioServer } from 'socket.io';
import { Socket } from 'socket.io-client';
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

	io.of(userSpace).on('connection', (socket) => {
		console.log(`one user connected ${socket.id}`);

		socket.join('room');

		console.log(io.sockets.adapter.rooms['room'].length);

		socket.use((packet, next) => {
			if (typeof packet[1] == 'string') {
				packet[1] = JSON.parse(packet[1]);
			}
			next();
		});

		socket.on('disconnected', () => {
			console.log('one user disconnected');
		});

		socket.on('subscribe', (msg) => {
			console.log(msg);
		});
	});
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
