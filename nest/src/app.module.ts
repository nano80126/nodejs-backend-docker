import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LyrcisModule } from '@/modules/lyrics.module';

@Module({
	imports: [LyrcisModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
