import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListController } from '@/controllers/list.controller';
import { ListService } from '@/services/list.service';
import { SearchRecord } from '@/entities/lyrics.entity';

@Module({
	imports: [TypeOrmModule.forFeature([SearchRecord])],
	controllers: [ListController],
	providers: [ListService],
	// exports: [TypeOrmModule],
})
export class ListModule {}
