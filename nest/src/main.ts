import { fastifyCookie } from '@fastify/cookie';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as dotenv from 'dotenv';

import { AppModule } from './app.module';

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

	// console.log(process.env.HOST, process.env.PORT);
	await app.listen(process.env.PORT || 3000, process.env.HOST || '127.0.0.1');
}

bootstrap();
