import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private logger = new Logger('http');

	use(req: FastifyRequest, res: FastifyReply, next: (error?: Error) => void) {
		this.logger.log(`Logging HTTP request ${req.method} ${req.url} ${res.statusCode}`);
		// this.logger.log(`Logging HTTP request ${req.raw}`);

		this.logger.debug(res.cookies);

		next();
	}
}
