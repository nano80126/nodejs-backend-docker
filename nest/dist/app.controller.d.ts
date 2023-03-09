import { FastifyReply } from 'fastify';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(reply: FastifyReply, param: string): void;
}
