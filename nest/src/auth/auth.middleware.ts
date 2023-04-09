import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private readonly authService: AuthService) {
		//
	}

	use(req: FastifyRequest, res: FastifyReply, next: (error?: Error) => void) {
		// console.log('auth middle');
		next();
	}
}
