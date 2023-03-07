import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LyricsController } from './lyrics.controller';
import { LyricsService } from './lyrics.service';
import { SearchRecord, Lyrics } from './lyrics.entity';

@Module({
	imports: [TypeOrmModule.forFeature([SearchRecord, Lyrics])],
	controllers: [LyricsController],
	providers: [LyricsService],
	// exports: [TypeOrmModule],
})
export class LyrcisModule {}
