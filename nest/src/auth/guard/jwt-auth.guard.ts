import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';

import { IS_PUBLIC_KEY, IS_SKIP_JWT } from '../auth.decorator';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	private readonly logger = new Logger(JwtAuthGuard.name);
	constructor(private readonly reflector: Reflector, private readonly authService: AuthService) {
		super();
	}

	handleRequest<TUser = any>(err: Error, user: any, info: Error | Express.AuthInfo, context: ExecutionContext, status?: any): TUser {
		this.logger.debug('jwt', err, user, info, status);

		if (err) throw new UnauthorizedException(err.message);
		else if (!user && info) throw new UnauthorizedException((info as Error).message);
		return user;
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const isSkipJwt = this.reflector.getAllAndOverride<boolean>(IS_SKIP_JWT, [context.getHandler(), context.getClass()]);
		return isSkipJwt ? true : super.canActivate(context);
	}
}
