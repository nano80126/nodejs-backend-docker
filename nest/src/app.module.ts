import { Module, SetMetadata } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import mariadb, { createPool } from 'mariadb';
import { DataSource } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ApiKeyAuthGuard } from './auth/guard/apiKey-auth.guard';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { AppConfig, JwtConfig, RedisConfig, VideoConfig } from './configs/index';
import { LyrcisModule } from './modules/lyrics/lyrics.module';
import { UsersModule } from './modules/user/user.module';
import { VideoModule } from './modules/video/video.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			load: [AppConfig, VideoConfig, JwtConfig, RedisConfig],
		}),
		TypeOrmModule.forRoot({
			type: 'mariadb',
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USER,
			password: process.env.DB_PWD,
			database: process.env.DB_NAME,
			retryAttempts: 3,
			entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
			synchronize: true,
			// ssl: Number(process.env.DB_SSL) === 1,
			timezone: '+00:00',
			autoLoadEntities: true,
		}),

		AuthModule,
		UsersModule,
		LyrcisModule,
		VideoModule,
	],
	controllers: [AppController],
	providers: [AppService, { provide: APP_GUARD, useClass: ApiKeyAuthGuard }, { provide: APP_GUARD, useClass: JwtAuthGuard }],
	// , { provide: APP_GUARD, useClass: JwtAuthGuard }
	// { provide: APP_GUARD, useClass: JwtAuthGuard }
	// , { provide: APP_GUARD, useClass: JwtAuthGuard }
})
export class AppModule {
	constructor(private dataSource: DataSource) {
		//
	}
}
