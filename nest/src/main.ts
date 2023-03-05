import { NestFactory } from '@nestjs/core';
import fastifyCookie from '@fastify/cookie';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;
const ip = process.env.IP || '127.0.0.1';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
		cors: {
			origin: ['http://localhost:3000', 'http://localhost:3001'],
		},
	});

	await app.register(fastifyCookie, {
		secret: 'my-secret',
	});

	const config = new DocumentBuilder()
		.setTitle('Lyrics example')
		.setDescription('The lyrics API description')
		.setVersion('1.0')
		.addTag('Lyrics')
		.addTag('YouTube')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger', app, document);

	// app.enableCors();
	await app.listen(port, ip);
}

bootstrap();
