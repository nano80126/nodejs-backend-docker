import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
	private client: Redis;

	constructor(private readonly configService: ConfigService) {
		this.client = new Redis({
			host: this.configService.get<string>('redisHost'),
			port: this.configService.get<number>('redisPort'),
			password: this.configService.get<string>('redisPassword'),
			db: this.configService.get<number>('redisDb'),
			retryStrategy(times) {
				return Math.min(times * 50, 2000);
			},
		});
	}

	/**
	 * 取得 client
	 * @returns client
	 */
	async getClient() {
		return this.client;
	}
}
