import { Module } from '@nestjs/common';

import { YouTubeController } from '@/controllers/youtube.controller';
import { YouTubeService } from '@/services/youtube.service';

@Module({
	controllers: [YouTubeController],
	providers: [YouTubeService],
})
export class YouTubeModule {}
