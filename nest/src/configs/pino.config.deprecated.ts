import { Request, Response } from 'express';
import { Options } from 'pino-http';
import { SerializedError, SerializedRequest, SerializedResponse } from 'pino-std-serializers';

export function pinoHttpOption(mode = 'development'): Options {
	return {
		customAttributeKeys: {
			req: 'request',
			res: 'response',
			err: 'error',
			responseTime: 'response time (ms)',
		},
		level: mode !== 'production' ? 'debug' : 'info',
		customLogLevel(_: Request, res: Response) {
			if (res.statusCode <= 300) return 'info';
			return 'error';
		},

		serializers: {
			req(_req: SerializedRequest) {
				return {
					method: _req.method,
					url: _req.url,
					params: (_req.raw as Request).params,
					query: (_req.raw as Request).query,
					body: (_req.raw as Request).body,
				};
			},
			res(_res: SerializedResponse) {
				return {
					status: _res.statusCode,
				};
			},
			err(_err: SerializedError) {
				return _err;
			},
		},

		transport: {
			target: 'pino-pretty',
			options:
				mode === 'development'
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
