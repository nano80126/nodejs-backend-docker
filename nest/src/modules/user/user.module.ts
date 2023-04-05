import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@/auth/auth.module';

import { RefreshToken } from './entities/refreshToken.entify';
import { User } from './entities/users.entity';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

import { RedisModule } from '../redis.module';

@Module({
	imports: [TypeOrmModule.forFeature([User, RefreshToken]), RedisModule],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
