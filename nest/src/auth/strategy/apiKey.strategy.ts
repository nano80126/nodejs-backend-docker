import { error, log } from 'console';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { data } from 'cheerio/lib/api/attributes';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { AuthService } from '../auth.service';

interface VerifiedCallback {
	(error: Error | null, user?: Express.User | false, info?: Express.AuthInfo): void;
}

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
	constructor(private readonly authService: AuthService) {
		super({ header: 'X-API-KEY', prefix: '' }, true, async (apiKey: string, done: VerifiedCallback, req: Express.Request) => {
			// if (await this.authService.validateApiKey(apiKey)) {
			// 	done(null, { apiKeyIsValid: true }, { message: 'X-API-KEY 驗證成功' });
			// } else {
			// 	done(new UnauthorizedException('X-API-KEY錯誤或不存在'), { apiKeyIsValid: false });
			// }
			this.validate(req, apiKey, done);
		});
		// super({ header: 'X-API-KEY', prefix: '' }, true);
	}

	async validate(req: Express.Request, apiKey: string, done: VerifiedCallback) {
		try {
			const isValid = await this.authService.validateApiKey(apiKey);
			done(null, { apiKeyIsValid: isValid }, { message: 'X-API-KEY 驗證成功' });
		} catch (error) {
			done(new UnauthorizedException(error.message), null, { message: 'X-API-KEY 驗證失敗' });
		}

		// if (await this.authService.validateApiKey(apiKey)) {
		// 	done(null, { apiKeyIsValid: true }, { message: 123 });
		// } else {
		// 	done(new UnauthorizedException('X-API-KEY錯誤或不存在'), { apiKeyIsValid: false });
		// }
	}
}
