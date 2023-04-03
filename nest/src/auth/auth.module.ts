import { consumers } from 'stream';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'rxjs';

import { UsersModule } from '@/modules/users/users.module';

import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { AuthService } from './auth.service';
import { ApiKeyStrategy } from './strategy/apiKey.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
	imports: [
		ConfigModule,
		UsersModule,
		PassportModule.register({ defaultStrategy: 'api-key' }),
		JwtModule.register({
			signOptions: {
				algorithm: 'HS256',
				expiresIn: '1d',
			},
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, ApiKeyStrategy, LocalStrategy, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes('auth');
	}
}
