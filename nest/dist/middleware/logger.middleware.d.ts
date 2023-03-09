import { NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
export declare class LoggerMiddleware implements NestMiddleware {
    private logger;
    use(req: FastifyRequest, res: FastifyReply, next: (error?: Error) => void): void;
}
