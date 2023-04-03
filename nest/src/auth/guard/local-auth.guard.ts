import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
	handleRequest<TUser = any>(err: Error, user: any, info: Error | { message: string }, context: ExecutionContext, status?: any): TUser {
		if (err) throw new UnauthorizedException(err.message);
		else if (!user) throw new UnauthorizedException(info.message);

		return user;
	}
}
