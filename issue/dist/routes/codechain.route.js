"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const iov_1 = require("../utils/iov");
const router = (0, express_1.Router)();
router.get('/daily-data/:enabledCode/:startTime/:endTime', (req, res) => {
    //
    const { enabledCode, startTime, endTime } = req.params;
    const dates = (0, iov_1.convertDateArr)(startTime, endTime);
    res.status(200).send({ dates });
});
exports.default = router;
