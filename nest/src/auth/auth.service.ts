import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import moment from 'moment';

import { UsersService } from '@/modules/user/user.service';

import { jwtPayloadDto, validateUserResDto } from './dto/auth.interface';

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
	async validateApiKey(apiKey: string) {
		const isValid = apiKey === this.configService.get<string>('xApiKey');
		if (!isValid) throw new Error('X-API-KEY 不正確');
		return isValid;
	}

	/**驗證 User */
	async validateUser(account: string, password: string) {
		const user = await this.usersService.findOneUser(account);

		if (!user) throw new Error('使用者帳號不存在');
		else if (!bcrypt.compareSync(password, user.password)) throw new Error('密碼錯誤');

		return { id: user.id, account: user.account, roles: [] };
	}

	/**生成 JWT token */
	async createJwtToken(payload: jwtPayloadDto) {
		return this.jwtService.sign(payload, {
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
	async createRefreshToken(payload: { id: number }) {
		const token = this.jwtService.sign(payload, {
			expiresIn: '7d',
			secret: this.configService.get<string>('jwtSecret'),
			issuer: this.configService.get<string>('jwtIssuer'),
			subject: this.configService.get<string>('jwtSubject'),
			audience: this.configService.get<string>('jwtAudience'),
		});

		// const update =
		await this.usersService.updateRefreshToken(payload.id, token, moment().utc().add(7, 'days').toDate());
		// console.log('update', update);

		return token;
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
