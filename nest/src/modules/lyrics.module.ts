import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LyricsController } from '@/controllers/lyrics.controller';
import { LyricsService } from '@/services/lyrics.service';
import { Lyrics } from '@/entities/lyrics.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Lyrics])],
	controllers: [LyricsController],
	providers: [LyricsService],
})
export class LyrcisModule {}
