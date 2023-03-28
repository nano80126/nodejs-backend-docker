import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import mariadb, { createPool } from 'mariadb';
import { DataSource } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import appConfig from './configs/app.config';
import videoConfig from './configs/video.config';
import { LyrcisModule } from './modules/lyrics/lyrics.module';
import { UsersModule } from './modules/users/users.module';
import { VideoModule } from './modules/video/video.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			load: [appConfig, videoConfig],
		}),
		TypeOrmModule.forRoot({
			type: 'mariadb',
			// driver: require('mariadb'),
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USER,
			password: process.env.DB_PWD,
			database: process.env.DB_NAME,
			retryAttempts: 3,
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true,
			ssl: Number(process.env.DB_SSL) === 1,
			timezone: '+00:00',
		}),

		AuthModule,
		UsersModule,
		LyrcisModule,
		VideoModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor(private dataSource: DataSource) {
		//
	}
}
