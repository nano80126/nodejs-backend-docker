"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    env: process.env.NODE_ENV,
    host: process.env.HOST || '127.0.0.1',
    port: parseInt(process.env.PORT) || 3000,
    xApiKey: process.env.X_API_KEY,
});
//# sourceMappingURL=app.config.js.map