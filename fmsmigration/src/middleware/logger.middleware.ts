import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private logger = new Logger('http');

	use(req: Request, res: Response, next: (error?: Error) => void) {
		this.logger.log(`Logging HTTP request ${req.method} ${req.url} ${res.statusCode}`);
		// this.logger.log(`Logging HTTP request ${req.raw}`);

		this.logger.debug(req.cookies);

		next();
	}
}
