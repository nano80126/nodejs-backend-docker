"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipJwtToken = exports.IS_SKIP_JWT = exports.SkipApiKey = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IS_PUBLIC_KEY = 'isPublic';
const SkipApiKey = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.SkipApiKey = SkipApiKey;
exports.IS_SKIP_JWT = 'isSkipJwt';
const SkipJwtToken = () => (0, common_1.SetMetadata)(exports.IS_SKIP_JWT, true);
exports.SkipJwtToken = SkipJwtToken;
//# sourceMappingURL=auth.decorator.js.map