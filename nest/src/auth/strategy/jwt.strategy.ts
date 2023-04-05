import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { AuthService } from '../auth.service';
// import { jwtPayloadDto } from '../dto/jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				ignoreExpiration: false,
				secretOrKey: process.env.JWT_SECRET,
				passReqToCallback: true,
			},
			async (req: Express.Request, payload: object, done: VerifiedCallback) => {
				// req.user 來自 api key guard
				// { apiKeyIsValid: boolean }
				done(null, { ...req.user, ...payload }, { message: 'JWT驗證成功' });
			},
		);
	}

	// async validate(payload: jwtPayloadDto) {
	// 	console.log('validate', payload);

	// 	// this.authService.verifyJwtToken();

	// 	// this.authService.verifyJwtToken(
	// 	// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImFjY291bnQiOiJuYW5vODAxMjYiLCJpYXQiOjE2ODA0NDUzMDAsImV4cCI6MTY4MDUzMTcwMCwiYXVkIjoiWW91VHViZSBVc2VyIiwiaXNzIjoiRGFuaWVsIEtlIiwic3ViIjoiWW91dHViZSBQbGF5ZXIgQmFja2VuZCJ9.Y3lIs5UuDtBCItz_U9bllX6_BYHFVrPuCHllODhd9F8',
	// 	// );

	// 	return payload;
	// }
}
