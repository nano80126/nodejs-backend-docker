import { MiddlewareConsumer, Module, NestModule, SetMetadata } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig, JwtConfig, RedisConfig } from './configs/index';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			load: [AppConfig, JwtConfig, RedisConfig],
		}),
		// TypeOrmModule.forRoot({
		// 	type: 'mariadb',
		// 	host: process.env.DB_HOST,
		// 	port: Number(process.env.DB_PORT),
		// 	username: process.env.DB_USER,
		// 	password: process.env.DB_PWD,
		// 	database: process.env.DB_NAME,
		// 	retryAttempts: 3,
		// 	entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
		// 	synchronize: true,
		// 	// ssl: Number(process.env.DB_SSL) === 1,
		// 	timezone: '+00:00',
		// 	autoLoadEntities: true,
		// }),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	constructor() {
		// private dataSource: DataSource
		//
	}

	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('/');
	}
}
