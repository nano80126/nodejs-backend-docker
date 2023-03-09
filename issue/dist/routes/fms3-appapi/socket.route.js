"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_1 = require("../../app");
const router = (0, express_1.Router)();
router.post('/subscribe', (req, res) => {
    const roomName = req.body.roomName;
    const isAdmin = req.body.isAdmin;
    app_1.appSocketClient.emit('subscribe', {
        roomName,
        isAdmin,
    }, (sRes) => {
        console.log(`Room: ${sRes.data}`);
        app_1.appSocketClient.on(`${roomName}Message`, (msg) => {
            console.log(`${roomName}Message`, msg);
        });
        res.status(200).send(sRes);
    });
});
router.get('/getChatRoomList', (req, res) => {
    app_1.appSocketClient.emit('getChatRoomList', {
        isAdmin: true,
    }, (sRes) => {
        sRes.data.driverRooms.forEach((e) => {
            console.log(e);
        });
        res.status(200).send(sRes);
    });
});
router.get('/getChats/:chatRoomUid', (req, res) => {
    const chatRoomUid = req.params.chatRoomUid;
    const query = req.query;
    app_1.appSocketClient.emit('getChats', {
        chatRoomUid,
        offset: Number(query.offset),
        limit: Number(query.limit),
    }, (sRes) => {
        sRes.data.forEach((e) => {
            console.log(e);
        });
        res.status(200).send(sRes);
    });
});
router.get('/joinChatRoom/:chatRoomUid', (req, res) => {
    //
    const chatRoomUid = req.params.chatRoomUid;
    app_1.appSocketClient.emit('joinChatRoom', {
        chatRoomUid,
    }, (sRes) => {
        //
        res.status(200).send(sRes);
    });
});
router.get('/leaveChatRoom/:chatRoomUid', (req, res) => {
    //
    const chatRoomUid = req.params.chatRoomUid;
    app_1.appSocketClient.emit('leaveChatRoom', {
        chatRoomUid,
    }, (sRes) => {
        //
        res.status(200).send(sRes);
    });
});
router.post('/readChat', (req, res) => {
    //
    const { chatsUid, chatRoomUid, fromUsersUid } = req.body;
    app_1.appSocketClient.emit('readChat', {
        chatsUid,
        chatRoomUid,
        fromUsersUid,
    }, (sRes) => {
        console.log(sRes);
    });
});
router.post('/listenChat', (req, res) => {
    const { chatsUid } = req.body;
    app_1.appSocketClient.emit('listenChat', {
        chatsUid,
    }, (sRes) => {
        console.log(sRes);
    });
});
exports.default = router;
