// import fastify, { FastifyRequest, FastifyReply } from 'fastify';
// import fastifyStatic from '@fastify/static';
// import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import moment from 'moment';
import mariadb from 'mariadb';
import { orderBy } from 'lodash';
import { waApiKey, doGet } from './utils/kwapi';
import { convertDateArr } from './utils/iov';
import { Server as ioServer } from 'socket.io';
import { io as ioClient } from 'socket.io-client';

import { KWCarNaviDirectiosDTO } from 'dtos/kw.interface';

// routeds
import coldchainRouter from './routes/codechain.route';
import { JourneyReportListReqDTO } from 'dtos/journey.interface';

// import { startSocket } from './socket';

// 載入 .env
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new ioServer().listen(server);
const client = ioClient('ws://127.0.0.1:3000');

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	}),
);

// 取得 host
const host = process.env.HOST || '127.0.0.1';
// 取得 port
const port: number = Number(process.env.PORT) || 3000;
// 註冊 static 路徑
// app.use();

//
const pool = mariadb.createPool({
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
	const unix = moment.unix(new Date().getTime() / 1000);

	// 這邊做測試用
	console.log(unix.format('YYYYMMDD HH:mm:ss'));
	console.log(moment().unix());
	console.log(moment().startOf('day').format('YYMMDD HH:mm:ss'));
	console.log(moment().startOf('day').unix());
	console.log(moment().add(-1, 'day').startOf('day').format('YYMMDD HH:mm:ss'));
	console.log(moment().add(-1, 'day').startOf('day').unix());
	console.log(~~(new Date().getTime() / 1000));

	res.status(200).send({ unix });
});

app.use('/coldchain/', coldchainRouter);

app.get('/send/message', async (req, res) => {
	const { a, b, c } = req.query;

	client.emit('subscribe', { a, b, c });

	res.status(200).send({});
});

app.post('/geo/directions', async (req, res) => {
	const { routes } = req.body;

	const reqRoutes = {
		origin: (routes as string[]).shift(),
		destination: (routes as string[]).pop(),
		waypoints: (routes as string[]).join('|'),
		vehicle: 4, // 車種;汽車=0(預設);一般機車=1;重機=2;貨車=3;大貨車=4;行人=5
	};

	const startTime = new Date().getTime();
	const kwresult = (await doGet(reqRoutes)) as KWCarNaviDirectiosDTO;
	const kw_diff = new Date().getTime() - startTime;

	console.log(kwresult);

	const data: {
		totalDistance: number;
		totalDuration: number;
		points: any[];
		polyline: string;
	}[] = [];

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
			} catch (err) {
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

	const { driverUid, startDate, endDate } = req.body as JourneyReportListReqDTO;

	const st = moment(startDate, 'YYYYMMDD').startOf('day').format('YYYY-MM-DD HH:mm:ss');
	const end = moment(endDate, 'YYYYMMDD').startOf('day').format('YYYY-MM-DD HH:mm:ss');

	const sql =
		`SELECT * FROM \`journey_report\` WHERE \`driver_uid\` = '${driverUid}' ` +
		`AND \`start_time\` >='${st}' AND \`end_time\` <= '${end}'`;

	const query = await conn.query(sql);

	const rpmObj = {
		score: 0,
		// economyCount: 0, // 經濟轉速發生次數
		// economyPercentage: 0, // 經濟轉速發生佔比。公式：所有行程之經濟轉速累計筆數 ÷ 總筆數
		totalSegmentSummary: 0, // 各轉速區段總時長，小時。
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

		const rpm: { low: number; economy: number; high: number } = JSON.parse(data['rpm'])['rpmSegmentCount'];
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

io.on('connection', (socket) => {
	console.log('one user connected', socket.id);

	socket.on('disconnect', () => {
		console.log('one user disconnected');
	});

	socket.on('subscribe', (msg) => {
		console.log(msg);
	});
});

setTimeout(() => {
	client.connect();
}, 1000);

export { app, io };
