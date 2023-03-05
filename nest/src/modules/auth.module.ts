import { AuthController } from '@/controllers/auth.controller';
import { AuthService } from '@/services/auth.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
