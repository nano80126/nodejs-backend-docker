import { Router } from 'express';

import { appSocketClient } from '../../app';
import {
	GetChatRoomListResDTO,
	GetChatsResDTO,
	JoinChatRoomResDTO,
	LeaveChatRoomResDTO,
	SubscribeResDTO,
} from './dtos/chat.dto';

const router = Router();

router.post('/subscribe', (req, res) => {
	const roomName = req.body.roomName;
	const isAdmin = req.body.isAdmin;

	appSocketClient.emit(
		'subscribe',
		{
			roomName,
			isAdmin,
		},
		(sRes: SubscribeResDTO) => {
			console.log(`Room: ${sRes.data}`);

			appSocketClient.on(`${roomName}Message`, (msg) => {
				console.log(`${roomName}Message`, msg);
			});
			res.status(200).send(sRes);
		},
	);
});

router.get('/getChatRoomList', (req, res) => {
	appSocketClient.emit(
		'getChatRoomList',
		{
			isAdmin: true,
		},
		(sRes: GetChatRoomListResDTO) => {
			sRes.data.driverRooms.forEach((e) => {
				console.log(e);
			});

			res.status(200).send(sRes);
		},
	);
});

router.get('/getChats/:chatRoomUid', (req, res) => {
	const chatRoomUid = req.params.chatRoomUid;
	const query = req.query;

	appSocketClient.emit(
		'getChats',
		{
			chatRoomUid,
			offset: Number(query.offset),
			limit: Number(query.limit),
		},
		(sRes: GetChatsResDTO) => {
			sRes.data.forEach((e) => {
				console.log(e);
			});

			res.status(200).send(sRes);
		},
	);
});

router.get('/joinChatRoom/:chatRoomUid', (req, res) => {
	//
	const chatRoomUid = req.params.chatRoomUid;

	appSocketClient.emit(
		'joinChatRoom',
		{
			chatRoomUid,
		},
		(sRes: JoinChatRoomResDTO) => {
			//

			res.status(200).send(sRes);
		},
	);
});

router.get('/leaveChatRoom/:chatRoomUid', (req, res) => {
	//
	const chatRoomUid = req.params.chatRoomUid;

	appSocketClient.emit(
		'leaveChatRoom',
		{
			chatRoomUid,
		},
		(sRes: LeaveChatRoomResDTO) => {
			//

			res.status(200).send(sRes);
		},
	);
});

router.post('/readChat', (req, res) => {
	//
	const { chatsUid, chatRoomUid, fromUsersUid } = req.body;

	appSocketClient.emit(
		'readChat',
		{
			chatsUid,
			chatRoomUid,
			fromUsersUid,
		},
		(sRes: any) => {
			console.log(sRes);
		},
	);
});

router.post('/listenChat', (req, res) => {
	const { chatsUid } = req.body;

	appSocketClient.emit(
		'listenChat',
		{
			chatsUid,
		},
		(sRes: any) => {
			console.log(sRes);
		},
	);
});

export default router;
