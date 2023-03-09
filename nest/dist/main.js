"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_1 = require("@fastify/cookie");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter(), {
        cors: {
            origin: ['http://localhost:3000', 'http://localhost:3001'],
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        },
    });
    await app.register(cookie_1.fastifyCookie, {
        secret: 'my-secret',
    });
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Lyrics example')
        .setDescription('The lyrics API description')
        .setVersion('1.0')
        .addTag('Lyrics')
        .addTag('YouTube')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    const configService = app.get(config_1.ConfigService);
    await app.listen(configService.get('port'), configService.get('host'));
    return configService;
}
bootstrap().then((configService) => {
    console.log();
    console.log('+' + ''.padEnd(120, '=') + '+');
    console.log(''.padEnd(20, ' '), `HOST: [ ${configService.get('host')} ] -`, `PORT: [ ${configService.get('port')} ] -`, `ENV: [ ${configService.get('env')} ]`, ''.padEnd(20, ' '));
    console.log('+' + ''.padEnd(120, '=') + '+');
});
//# sourceMappingURL=main.js.map