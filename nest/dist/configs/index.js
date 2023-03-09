"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisConfig = exports.VideoConfig = exports.JwtConfig = exports.AppConfig = void 0;
const app_config_1 = __importDefault(require("./app.config"));
exports.JwtConfig = app_config_1.default;
const jwt_config_1 = __importDefault(require("./jwt.config"));
exports.AppConfig = jwt_config_1.default;
const redis_config_1 = __importDefault(require("./redis.config"));
exports.RedisConfig = redis_config_1.default;
const video_config_1 = __importDefault(require("./video.config"));
exports.VideoConfig = video_config_1.default;
//# sourceMappingURL=index.js.map