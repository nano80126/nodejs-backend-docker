import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LyrcisModule } from '@/modules/lyrics.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Lyrics } from './entities/lyrics.entity';

const typeOrnRoot = TypeOrmModule.forRoot({
	type: 'mysql',
	host: 'mysql',
	port: 3306,
	username: 'root',
	password: '0000',
	database: 'TEST',
	retryAttempts: 3,
	entities: [Lyrics],
	synchronize: true,
	timezone: '-08:00',
});

@Module({
	imports: [typeOrnRoot, LyrcisModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
