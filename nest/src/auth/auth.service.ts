import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { use } from 'chai';
import { sign, verify } from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { UsersService } from '@/modules/users/users.service';

import { jwtPayloadDto } from './dto/jwt.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly configService: ConfigService,
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	// async test() {
	// 	console.log(123, this.configService.get<string>('youtubeapi'));
	// }

	/** 驗證 X-API-KEY */
	validateApiKey(apiKey: string) {
		return apiKey === this.configService.get<string>('xApiKey');
	}

	/**驗證 User */
	async validateUser(account: string, password: string) {
		const user = await this.usersService.findOneUser(account);

		if (!user) throw new Error('使用者帳號不存在');
		else if (!bcrypt.compareSync(password, user.password)) throw new Error('密碼錯誤');

		return { uid: user.id, account: user.account };
	}

	/**生成 JWT token */
	async createJwtToken<T>(payload: T) {
		return this.jwtService.sign(payload as object, {
			secret: this.configService.get<string>('jwtSecret'),
			issuer: this.configService.get<string>('jwtIssuer'),
			subject: this.configService.get<string>('jwtSubject'),
			audience: this.configService.get<string>('jwtAudience'),
		});
	}

	/**驗證 JWT token */
	async verifyJwtToken(token: string) {
		return this.jwtService.verify(token, {
			secret: this.configService.get<string>('jwtSecret'),
			issuer: this.configService.get<string>('jwtIssuer'),
			subject: this.configService.get<string>('jwtSubject'),
			audience: this.configService.get<string>('jwtAudience'),
		});
	}

	/**生成 Refresh Token */
	async createRefreshToken<T>(payload: T) {
		return this.jwtService.sign(payload as object, {
			expiresIn: '7d',
			secret: this.configService.get<string>('jwtSecret'),
			issuer: this.configService.get<string>('jwtIssuer'),
			subject: this.configService.get<string>('jwtSubject'),
			audience: this.configService.get<string>('jwtAudience'),
		});
	}

	/**
	 * 更新 Access Token
	 * @param token fresh token
	 */
	async refreshAccessToken(token: string) {
		//
		const payload = this.verifyJwtToken(token);
		console.log(payload);
	}
}
