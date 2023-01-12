import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LyrcisModule } from '@/modules/lyrics.module';
import { TypeOrmModule } from '@nestjs/typeorm';

const typeOrnRoot = TypeOrmModule.forRoot({
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: '0000',
	database: 'test',
	entities: [],
	synchronize: true,
});

@Module({
	imports: [LyrcisModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
