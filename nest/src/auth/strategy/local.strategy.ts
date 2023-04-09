import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super(
			{ usernameField: 'account', passwordField: 'password', passReqToCallback: true },
			async (req: Express.Request, account: string, password: string, done: (error: Error, user?: Express.User | false) => void) => {
				this.validate(req, account, password, done);
			},
		);

		// super({ usernameField: 'account', passwordField: 'password', passReqToCallback: true });
	}

	async validate(
		req: Express.Request,
		account: string,
		password: string,
		done: (error: Error | null, user?: Express.User | false, info?: Express.AuthInfo) => void,
	) {
		try {
			const user = await this.authService.validateUser(account, password);
			done(null, user, { message: '登入成功' });
		} catch (error) {
			done(new UnauthorizedException(error.message), null, { message: '登入失敗' });
		}
	}
}
