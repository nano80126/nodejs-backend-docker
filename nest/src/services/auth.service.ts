import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';

@Injectable()
export class AuthService {
	constructor() {
		//
	}

	async createAuthToken(payload: { uid: string }) {
		return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
			algorithm: 'HS256',
			expiresIn: '86400s',
		});
	}

	async verifyAuthToken(token: string) {
		///
		const decode = jsonwebtoken.verify(token, process.env.JWT_SECRET);
		return decode;
	}
}
