import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LyricsController } from '@/controllers/lyrics.controller';
import { LyricsService } from '@/services/lyrics.service';
import { SearchRecord, Lyrics } from '@/entities/lyrics.entity';

@Module({
	imports: [TypeOrmModule.forFeature([SearchRecord, Lyrics])],
	controllers: [LyricsController],
	providers: [LyricsService],
	// exports: [TypeOrmModule],
})
export class LyrcisModule {}
