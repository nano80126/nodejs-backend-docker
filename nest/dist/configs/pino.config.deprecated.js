"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinoHttpOption = void 0;
function pinoHttpOption(mode = 'development') {
    return {
        customAttributeKeys: {
            req: 'request',
            res: 'response',
            err: 'error',
            responseTime: 'response time (ms)',
        },
        level: mode !== 'production' ? 'debug' : 'info',
        customLogLevel(_, res) {
            if (res.statusCode <= 300)
                return 'info';
            return 'error';
        },
        serializers: {
            req(_req) {
                return {
                    method: _req.method,
                    url: _req.url,
                    params: _req.raw.params,
                    query: _req.raw.query,
                    body: _req.raw.body,
                };
            },
            res(_res) {
                return {
                    status: _res.statusCode,
                };
            },
            err(_err) {
                return _err;
            },
        },
        transport: {
            target: 'pino-pretty',
            options: mode === 'development'
                ? {
                    colorize: true,
                    levelFirst: true,
                    translateTime: 'yyyy-mm-dd HH:MM:ss.l',
                }
                : {
                    colorize: false,
                    levelFirst: true,
                    translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
                    destination: './log/combined.log',
                    mkdir: true,
                },
        },
    };
}
exports.pinoHttpOption = pinoHttpOption;
//# sourceMappingURL=pino.config.deprecated.js.map