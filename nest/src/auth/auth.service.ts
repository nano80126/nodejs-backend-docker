import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';
import { UsersService } from '@/users/users.service';
import { use } from 'chai';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService) {
		//
	}

	async validateUser(username: string, password: string) {
		const user = await this.usersService.findOne(username);

		console.log(user);

		return user;
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
