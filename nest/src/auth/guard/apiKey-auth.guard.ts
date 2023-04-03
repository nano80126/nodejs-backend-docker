import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { IS_PUBLIC_KEY } from '../auth.decorator';

@Injectable()
export class ApiKeyAuthGuard extends AuthGuard('api-key') {
	constructor(private reflector: Reflector) {
		super();
	}

	handleRequest<TUser = any>(err: Error, user: any, info: Error | { message: string }, context: ExecutionContext, status?: any): TUser {
		if (err) throw new UnauthorizedException(err.message);
		else if (!user) throw new UnauthorizedException(info.message);
		return user;
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
		return isPublic ? true : super.canActivate(context);
	}
}
