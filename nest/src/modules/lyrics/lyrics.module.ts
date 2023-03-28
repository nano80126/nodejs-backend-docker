import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LyricsController } from './lyrics.controller';
import { Lyrics, SearchRecord } from './lyrics.entity';
import { LyricsService } from './lyrics.service';

@Module({
	imports: [TypeOrmModule.forFeature([SearchRecord, Lyrics])],
	controllers: [LyricsController],
	providers: [LyricsService],
	// exports: [TypeOrmModule],
})
export class LyrcisModule {}
