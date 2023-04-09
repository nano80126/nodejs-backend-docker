import { Injectable, UnauthorizedException } from '@nestjs/common';
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
				this.validate(req, payload, done);
			},
		);
	}

	async validate(req: Express.Request, payload: object, done: VerifiedCallback) {
		// console.log(req.user);
		try {
			done(null, payload, { message: 'JWT 驗證成功' });
		} catch (error) {
			done(new UnauthorizedException(error.message), null, { message: 'JWT 驗證失敗' });
		}
	}
}
