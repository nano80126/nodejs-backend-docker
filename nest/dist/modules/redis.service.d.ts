import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
export declare class RedisService {
    private readonly configService;
    private client;
    constructor(configService: ConfigService);
    getClient(): Promise<Redis>;
}
