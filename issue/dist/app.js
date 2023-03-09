"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appSocketClient = exports.server = exports.app = void 0;
// import fastify, { FastifyRequest, FastifyReply } from 'fastify';
// import fastifyStatic from '@fastify/static';
// import fastifyCors from '@fastify/cors';
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const moment_1 = __importDefault(require("moment"));
const mariadb_1 = __importDefault(require("mariadb"));
const kwapi_1 = require("./utils/kwapi");
const socket_io_client_1 = require("socket.io-client");
// routeds
const codechain_route_1 = __importDefault(require("./routes/codechain.route"));
const socket_route_1 = __importDefault(require("./routes/fms3-appapi/socket.route"));
const socket_1 = require("./socket");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
// 載入 .env
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
// const io = new ioServer().listen(server);
// const client1 = ioClient('ws://127.0.0.1:3000/user', {
// 	transports: ['websocket', 'polling'],
// });
// const client2 = ioClient('ws://127.0.0.1:3000/admin', {
// 	transports: ['websocket', 'polling'],
// });
// const clientArr = new Array(25).fill(null).map(() => {
// 	return ioClient('ws://127.0.0.1:3000/admin', {
// 		transports: ['websocket', 'polling'],
// 	});
// });
// clientArr.forEach((e) => {
// 	e.on('joinroom', (msg) => {
// 		console.log(`${msg.id} join room. ${e.id}`);
// 	});
// });
// setTimeout(() => {
// 	ioClient('ws://127.0.0.1:3000/admin', {
// 		transports: ['websocket', 'polling'],
// 	});
// }, 5000);
const appSocketClient = (0, socket_io_client_1.io)('ws://127.0.0.1:5000/appwss', {
    path: '/appsocket',
    transports: ['websocket'],
    secure: true,
    auth: {
        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
            '.eyJub25jZSI6IjE3MzIyMDE5ODY1NTI3MDgwODE3Ii' +
            'wiYXpwIjoiZWM4YjI0OWYxOGY0NGEwZWI4ZDU3YzUyM' +
            'zc0YjNmOTciLCJzY29wZSI6IiIsImlhdCI6MTY4MTM3' +
            'NzIzMSwiZXhwIjoxNjgxNDYzNjMxLCJhdWQiOltdLCJ' +
            'pc3MiOiJmbXMzIiwic3ViIjoiMTczMjIwMTk4NjU1Mj' +
            'cwNzcwOTQifQ.m_G_XwyAa7iCOrX1lO8jm7-tZ3m7rFgrCzWCByq_2F8',
    },
});
exports.appSocketClient = appSocketClient;
// client1.on('connection', (socket) => {
// 	console.log(socket);
// });
// client1.on('broadcast', (msg, callback) => {
// 	console.log(msg);
// 	console.log(callback);
// });
// client2.on('broadcast', (msg, callback) => {
// 	console.log(msg);
// 	console.log(callback);
// });
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
// 取得 host
const host = process.env.HOST || '127.0.0.1';
// 取得 port
const port = Number(process.env.PORT) || 3000;
// 註冊 static 路徑
// app.use();
//
const pool = mariadb_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    connectionLimit: Number(process.env.DB_POOL_SIZE),
    ssl: process.env.DB_SSL === '1',
    collation: 'UTF8MB4_GENERAL_CI',
});
app.get('/ping', (req, res) => {
    res.status(200).send('pong\n');
});
app.post('/ping', (req, res) => {
    console.log(req.body);
    res.status(200).send('susscess');
});
app.get('/time-format', (req, res) => {
    const unix = moment_1.default.unix(new Date().getTime() / 1000);
    // 這邊做測試用
    console.log(unix.format('YYYYMMDD HH:mm:ss'));
    console.log((0, moment_1.default)().unix());
    console.log((0, moment_1.default)().startOf('day').format('YYMMDD HH:mm:ss'));
    console.log((0, moment_1.default)().startOf('day').unix());
    console.log((0, moment_1.default)().add(-1, 'day').startOf('day').format('YYMMDD HH:mm:ss'));
    console.log((0, moment_1.default)().add(-1, 'day').startOf('day').unix());
    console.log(~~(new Date().getTime() / 1000));
    res.status(200).send({ unix });
});
app.use('/appsocket/', socket_route_1.default);
app.use('/coldchain/', codechain_route_1.default);
app.get('/socket/joinroom', async (req, res) => {
    const client = (0, socket_io_client_1.io)('ws://127.0.0.1:3000/user');
    client.connect();
    setTimeout(() => {
        client.disconnect();
    }, 1000 * 10);
    res.status(200).send('new user');
});
app.get('/send/message', async (req, res) => {
    // const { a, b, c } = req.query;
    // client1.emit('subscribe', { a, b, c });
    // console.log(r);
    // client1.emit('subscribe', { b, a, c: a });
    // client2.emit('subscribe', { c, b, a });
    // client2.emit('subscribe', { b, a, c: a });
    res.status(200).send({});
});
app.post('/geo/directions', async (req, res) => {
    const { routes } = req.body;
    const reqRoutes = {
        origin: routes.shift(),
        destination: routes.pop(),
        waypoints: routes.join('|'),
        vehicle: 4, // 車種;汽車=0(預設);一般機車=1;重機=2;貨車=3;大貨車=4;行人=5
    };
    const startTime = new Date().getTime();
    const kwresult = (await (0, kwapi_1.doGet)(reqRoutes));
    const kw_diff = new Date().getTime() - startTime;
    const data = [];
    kwresult.routes.forEach((r) => {
        let totalDistance = 0;
        let totalDuration = 0;
        const points = [];
        for (let i = 0; i < r.legs.length; i++) {
            try {
                const leg = r.legs[i];
                totalDistance += leg.distance.value;
                totalDuration += leg.duration.value;
                points.push({
                    seq: `${i}`,
                    address: leg.startAddress,
                    location: leg.startLocation,
                });
                for (let j = 1; j < leg.steps.length - 1; j++) {
                    points.push({
                        seq: `${i}-${j - 1}`,
                        address: '',
                        location: leg.steps[j].startLocation,
                    });
                }
                if (i == r.legs.length - 1) {
                    points.push({
                        seq: i + 1,
                        address: leg.endAddress,
                        location: leg.endLocation,
                    });
                }
            }
            catch (err) {
                console.error(err);
            }
        }
        data.push({
            totalDistance,
            totalDuration,
            points,
            polyline: r.overviewPolyline.points,
        });
    });
    console.log(data);
    res.status(200).send({
        status: 0,
        data,
        kw_res_time: `${kw_diff}ms`,
    });
});
// app.get('/promise', async (req, res) => {
// 	const promise = testPromise();
// 	res.status(200).send(promise);
// });
app.post('/journey/list', async (req, res) => {
    const conn = await pool.getConnection();
    const { driverUid, startDate, endDate } = req.body;
    const st = (0, moment_1.default)(startDate, 'YYYYMMDD').startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const end = (0, moment_1.default)(endDate, 'YYYYMMDD').startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const sql = `SELECT * FROM \`journey_report\` WHERE \`driver_uid\` = '${driverUid}' ` +
        `AND \`start_time\` >='${st}' AND \`end_time\` <= '${end}'`;
    const query = await conn.query(sql);
    const rpmObj = {
        score: 0,
        // economyCount: 0, // 經濟轉速發生次數
        // economyPercentage: 0, // 經濟轉速發生佔比。公式：所有行程之經濟轉速累計筆數 ÷ 總筆數
        totalSegmentSummary: 0,
        segment: {
            low: {
                // 低轉速。時長單位：小時。
                summary: 0,
                percentage: 0,
            },
            economy: {
                // 經濟轉速。時長單位：小時。
                summary: 0,
                percentage: 0,
            },
            high: {
                // 高轉速。時長單位：小時。
                summary: 0,
                percentage: 0,
            },
        },
    };
    // let min = 0;
    for (let i = 0; i < query.length; i++) {
        // console.log(query[i]['engine_total_time']);
        const data = query[i];
        const rpm = JSON.parse(data['rpm'])['rpmSegmentCount'];
        const { low, economy, high } = rpm;
        rpmObj.totalSegmentSummary += low + high + economy;
        rpmObj.segment.low.summary += low;
        rpmObj.segment.economy.summary += economy;
        rpmObj.segment.high.summary += high;
    }
    // 計算 rpm
    rpmObj.totalSegmentSummary = Math.round((rpmObj.totalSegmentSummary / 3600) * 10) / 10; //
    rpmObj.segment.low.summary = Math.round((rpmObj.segment.low.summary / 3600) * 10) / 10; //
    rpmObj.segment.economy.summary = Math.round((rpmObj.segment.economy.summary / 3600) * 10) / 10; //
    rpmObj.segment.high.summary = Math.round((rpmObj.segment.high.summary / 3600) * 10) / 10; //
    rpmObj.segment.low.percentage = Math.round((rpmObj.segment.low.summary / rpmObj.totalSegmentSummary) * 1000) / 10;
    rpmObj.segment.economy.percentage =
        Math.round((rpmObj.segment.economy.summary / rpmObj.totalSegmentSummary) * 1000) / 10;
    rpmObj.segment.high.percentage = Math.round((rpmObj.segment.high.summary / rpmObj.totalSegmentSummary) * 1000) / 10;
    rpmObj.score = rpmObj.totalSegmentSummary === 0 ? 0 : 100;
    res.status(200).send(rpmObj);
});
server.listen(port, host, () => {
    console.log(`server listen at ${host}:${port}`);
});
(0, socket_1.initSocketIO)(server);
