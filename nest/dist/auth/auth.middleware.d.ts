import { NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
export declare class AuthMiddleware implements NestMiddleware {
    private readonly authService;
    constructor(authService: AuthService);
    use(req: FastifyRequest, res: FastifyReply, next: (error?: Error) => void): void;
}
