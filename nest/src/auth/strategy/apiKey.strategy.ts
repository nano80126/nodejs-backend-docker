import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
	constructor(private readonly authService: AuthService) {
		super({ header: 'X-API-KEY', prefix: '' }, true, async (apiKey: string, done: (err: Error | null, user?: object, info?: object) => void) => {
			if (this.authService.validateApiKey(apiKey)) {
				done(null, { apiKeyIsValid: true }, { message: '123' });
			} else {
				done(new UnauthorizedException('X-API-KEY錯誤或不存在'), { apiKeyIsValid: false });
			}
		});
	}
}
