import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { Lyrics } from './entities/lyrics.entity';
// import { SearchRecord, Lyrics } from './deprecated/index';
// import { SearchController } from './controllers/search.controller';
// import { SearchService } from './services/search.service';
import { AuthModule } from '@/auth/auth.module';
import { LyrcisModule } from '@/modules/lyrics/lyrics.module';
import { YouTubeModule } from '@/modules/youtube.module';
import { SearchModule } from '@/modules/search.module';
import { ListModule } from './modules/list.module';
import { UsersModule } from './users/users.module';

const typeOrmRoot = TypeOrmModule.forRoot({
	type: 'mariadb',
	host: 'mariadb',
	port: 3306,
	username: 'root',
	password: '0000',
	database: 'youtube_player',
	retryAttempts: 3,
	// entities: ['./entities/index.ts'],
	entities: [__dirname + '/**/*.entity{.ts,.js}'],
	// autoLoadEntities: true,
	synchronize: true,
	timezone: '-08:00',
});

// console.log(__dirname);

@Module({
	imports: [typeOrmRoot, AuthModule, UsersModule, LyrcisModule, YouTubeModule, SearchModule, ListModule, UsersModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
