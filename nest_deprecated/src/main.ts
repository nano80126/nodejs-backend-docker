import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 4000;
const ip = process.env.IP || '127.0.0.1';

console.log(port, ip);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port, ip);
}
bootstrap();
