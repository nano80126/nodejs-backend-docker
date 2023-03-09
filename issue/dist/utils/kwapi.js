"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doGet = exports.waApiKey = void 0;
const is_empty_1 = __importDefault(require("is-empty"));
const crypto_1 = require("crypto");
const axios_1 = __importDefault(require("axios"));
const lodash_1 = require("lodash");
const waApiKey = () => {
    const tag = 'waApiKey';
    const partA = process.env.WA_TOKEN;
    const partB = Buffer.from(Math.floor(new Date().getTime() / 1000).toString(), 'utf-8').toString('base64');
    const partC = (0, crypto_1.createHmac)('SHA256', process.env.WA_HOT_KEY)
        .update(`${partA}.${partB}`)
        .digest('hex');
    return `${partA}.${partB}.${partC}`;
};
exports.waApiKey = waApiKey;
const doGet = async (params, headers = {}) => {
    const tag = 'doGet';
    const url = process.env.WA_API_BASE_URL + '/CarNavi/Directions';
    const _headers = (0, is_empty_1.default)(headers) ? { Authorization: (0, exports.waApiKey)() } : (0, lodash_1.merge)(headers, { Authorization: (0, exports.waApiKey)() });
    return axios_1.default
        .get(url, {
        params,
        headers: _headers,
    })
        .then((res) => {
        return res.data;
    })
        .catch((err) => {
        console.error(err);
    });
};
exports.doGet = doGet;
