import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { IVerifyOptions, Strategy } from 'passport-local';

import { User } from '@/modules/user/entities/users.entity';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService, private readonly moduleRef: ModuleRef) {
		// , private readonly moduleRef: ModuleRef
		// passReqToCallback: true
		super(
			{ usernameField: 'account', passwordField: 'password', passReqToCallback: true },
			async (
				req: Express.Request,
				account: string,
				password: string,
				done: (error: Error, user?: Express.User | false, options?: IVerifyOptions) => void,
			) => {
				try {
					const user = await this.authService.validateUser(account, password);
					done(null, { ...user, ...req.user }, { message: '登入成功' });
				} catch (error) {
					done(new UnauthorizedException(error.message), null, { message: error.message });
				}
			},
		);
		// { usernameField: 'account', password: 'password' },
		// async (account: string, password: string, done: (error: Error, user: Users, authInfo: { message: string }) => void) => {
		// 	try {
		// 		const user = await this.authService.validateUser(account, password);
		// 		console.log(user);

		// 		done(null, user, { message: '使用者驗證成功' });
		// 		// done(new UnauthorizedException(''), null, { message: '使用者驗證失敗' });
		// 	} catch (error) {
		// 		done(new UnauthorizedException(error.message), null, { message: error.message });
		// 	}
		// },
	}
}
