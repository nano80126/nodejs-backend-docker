import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';

import { IS_PUBLIC_KEY, IS_SKIP_JWT } from '../auth.decorator';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private readonly reflector: Reflector, private readonly authService: AuthService) {
		super();
	}

	handleRequest<TUser = any>(err: Error, user: any, info: Error | { message: string }, context: ExecutionContext, status?: any): TUser {
		if (err) throw new UnauthorizedException(err.message);
		else if (!user) throw new UnauthorizedException(info.message);

		return user;
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const isSkipJwt = this.reflector.getAllAndOverride<boolean>(IS_SKIP_JWT, [context.getHandler(), context.getClass()]);

		// if (isSkipJwt) return true;
		// const request = context.switchToHttp().getRequest() as FastifyRequest & { user: { apiKeyIsValid: boolean } };
		// console.log(request.cookies['refresh-token']);
		// console.log(request.user);

		// // const accessToken = request.
		return isSkipJwt ? true : super.canActivate(context);
	}
}
