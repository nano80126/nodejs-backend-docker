import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '@/modules/users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';

@Module({
	imports: [
		ConfigModule,
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: new jwtConstants().secret || '1231231312312',
			signOptions: {
				algorithm: 'HS256',
				expiresIn: '86400s',
			},
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
