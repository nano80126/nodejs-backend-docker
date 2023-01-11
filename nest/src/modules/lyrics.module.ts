import { Module } from '@nestjs/common';
import { LyricsController } from '@/controllers/lyrics.controller';
import { LyricsService } from '@/services/lyrics.service';

@Module({
	imports: [],
	controllers: [LyricsController],
	providers: [LyricsService],
})
export class LyrcisModule {}
