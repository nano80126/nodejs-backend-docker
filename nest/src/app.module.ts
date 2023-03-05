import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { Lyrics } from './entities/lyrics.entity';
// import { SearchRecord, Lyrics } from './deprecated/index';
// import { SearchController } from './controllers/search.controller';
// import { SearchService } from './services/search.service';
import { AuthModule } from './modules/auth.module';
import { LyrcisModule } from '@/modules/lyrics.module';
import { YouTubeModule } from '@/modules/youtube.module';
import { SearchModule } from '@/modules/search.module';
import { ListModule } from './modules/list.module';

const typeOrnRoot = TypeOrmModule.forRoot({
	type: 'mariadb',
	host: 'mariadb',
	port: 3306,
	username: 'root',
	password: '0000',
	database: 'youtube_player',
	retryAttempts: 3,
	// entities: ['./entities/index.ts'],
	entities: [__dirname + '/entities/*.entity{.ts,.js}'],
	// autoLoadEntities: true,
	synchronize: true,
	timezone: '-08:00',
});

// console.log(__dirname);

@Module({
	imports: [typeOrnRoot, AuthModule, LyrcisModule, YouTubeModule, SearchModule, ListModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
