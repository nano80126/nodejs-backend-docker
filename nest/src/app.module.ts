import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LyrcisModule } from '@/modules/lyrics.module';
import { YouTubeModule } from '@/modules/youtube.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Lyrics } from './entities/lyrics.entity';
import { SearchController } from './controllers/search.controller';
import { SearchService } from './services/search.service';
import { SearchModule } from './modules/search.module';

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
	imports: [typeOrnRoot, LyrcisModule, YouTubeModule, SearchModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
