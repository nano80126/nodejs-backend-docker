import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { use } from 'chai';
import { sign, verify } from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { UsersService } from '@/modules/users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private configService: ConfigService,
	) {
		//
	}

	async test() {
		console.log(123, this.configService.get<string>('youtubeapi'));
	}

	async validateUser(username: string, password: string) {
		const user = await this.usersService.findOne(username);

		console.log(user);

		if (user && user.password === password) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async createAuthToken(payload: { uid: string }) {
		return {
			access_token: this.jwtService.sign(payload, {
				secret: '',
				algorithm: 'HS256',
				expiresIn: '86400s',
			}),
		};
	}

	async verifyAuthToken(token: string) {
		///
		const decode = verify(token, process.env.JWT_SECRET);
		return decode;
	}
}
