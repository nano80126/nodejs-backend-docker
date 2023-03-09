"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    jwtSecret: process.env.JWT_SECRET,
    jwtIssuer: process.env.JWT_ISSUER,
    jwtSubject: process.env.JWT_SUBJECT,
    jwtAudience: process.env.JWT_AUDIENCE,
});
//# sourceMappingURL=jwt.config.js.map