interface ChatBaseResDTO {
	status: number;
	message: string;
}

export interface SubscribeResDTO extends ChatBaseResDTO {
	data: string;
}

interface DriverRoomsDTO {
	uid: string;
	chatRoomType: string;
	usersUid: string;
	usersZhName: string;
	chatsQty: number;
	lastChat: {
		uid: string;
		chatRoomUid: string;
		fromUsersUid: string;
		fromUsersZhName: string;
		readQty: number;
		isListen: false;
		size: number;
		duration: number;
		url: string;
		createdAt: string;
	};
	unreadQty: 0;
}

export interface GetChatRoomListResDTO extends ChatBaseResDTO {
	data: {
		driverRooms: DriverRoomsDTO[];
	};
}

interface ChatDTO {
	uid: string;
	chatRoomUid: string;
	fromUsersUid: string;
	fromUsersZhName: string;
	readQty: number;
	isListen: boolean;
	size: number;
	duration: number;
	url: string;
	/**YYYY-MM-DDTHH:mm:ss.lllZ */
	createdAt: string;
}

export interface GetChatsResDTO extends ChatBaseResDTO {
	data: ChatDTO[];
}

export interface JoinChatRoomResDTO extends ChatBaseResDTO {
	data: any;
}

export interface LeaveChatRoomResDTO extends ChatBaseResDTO {
	data: any;
}
