"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDateArr = exports.getExternalDeviceDetail = exports.callApi = void 0;
const moment_1 = __importDefault(require("moment"));
// import {} from "lodash"
const callApi = (url, data, failureStatus, tag) => {
    //
};
exports.callApi = callApi;
/**
 *
 * @param data
 * @returns
 */
const getExternalDeviceDetail = (data) => {
    const tag = 'getExternalDeviceDetail';
    const url = '/api/v1/externalDevicesDetail';
    const failureStatus = 4034012;
    return (0, exports.callApi)(url, data, failureStatus, tag);
};
exports.getExternalDeviceDetail = getExternalDeviceDetail;
/**
 *
 * @param startDate 開始日期 (formart: YYYYMMDD)
 * @param endDate 結束日期 (format: YYYYMMDD)
 */
const convertDateArr = (startDate, endDate) => {
    let i = 0;
    const dates = [];
    const st = (0, moment_1.default)(startDate, 'YYYYMMDD').startOf('day');
    const end = (0, moment_1.default)(endDate, 'YYYYMMDD').startOf('day');
    // dates.push(st.format('YYYYMMDD'));
    while (i <= (0, moment_1.default)(end).diff(st, 'days')) {
        const date = (0, moment_1.default)(startDate).add(i, 'days').format('YYYYMMDD');
        dates.push(date);
        i++;
    }
    return dates;
};
exports.convertDateArr = convertDateArr;
