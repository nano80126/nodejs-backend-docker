import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
	private readonly logger = new Logger(LocalAuthGuard.name);

	constructor() {
		super();
	}

	handleRequest<TUser = any>(err: Error, user: any, info: Error | Express.AuthInfo, context: ExecutionContext, status?: any): TUser {
		this.logger.debug('local', err, user, info, status);

		if (err) throw new UnauthorizedException(err.message);
		else if (!user && info) throw new UnauthorizedException((info as Error).message);
		return user;
	}
}
