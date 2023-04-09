import { fastifyCookie } from '@fastify/cookie';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
		cors: {
			origin: ['http://localhost:3000', 'http://localhost:3001'],
			methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
		},
		// logger: false,
		// bufferLogs: true,
	});

	await app.register(fastifyCookie, {
		secret: 'my-secret',
	});

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Lyrics example')
		.setDescription('The lyrics API description')
		.setVersion('1.0')
		.addTag('Lyrics')
		.addTag('YouTube')
		.build();

	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('swagger', app, document);

	// app.useLogger(app.get(Logger));

	const configService = app.get(ConfigService);
	await app.listen(configService.get<number>('port'), configService.get<string>('host'));

	return configService;
}

bootstrap().then((configService) => {
	console.log(); // 換行用
	console.log('+' + ''.padEnd(120, '=') + '+');
	console.log(
		''.padEnd(20, ' '),
		`HOST: [ ${configService.get('host')} ] -`,
		`PORT: [ ${configService.get('port')} ] -`,
		`ENV: [ ${configService.get('env')} ]`,
		''.padEnd(20, ' '),
	);
	console.log('+' + ''.padEnd(120, '=') + '+');
});
