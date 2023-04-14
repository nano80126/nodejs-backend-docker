// import fastify, { FastifyRequest, FastifyReply } from 'fastify';
// import fastifyStatic from '@fastify/static';
// import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import moment, { monthsShort } from 'moment';
import mariadb from 'mariadb';
import { orderBy } from 'lodash';
import { waApiKey, doGet } from './utils/kwapi';
import { convertDateArr, convertDateArr2 } from './utils/iov';
import { Server as ioServer } from 'socket.io';
import { io as ioClient } from 'socket.io-client';
import { hostname } from 'os';
// import './utils/test';

import { KWCarNaviDirectiosDTO } from './dtos/kw.interface';

// routeds
import coldchainRouter from './routes/codechain.route';
import { JourneyReportListReqDTO } from './dtos/journey.interface';

import { initSocketIO } from './socket';
//import chain from './json/coldchain.json';
// console.log(chain.data.length);

// 載入 .env
dotenv.config();

const app = express();
const server = http.createServer(app);
// const io = new ioServer().listen(server);
const client1 = ioClient('ws://127.0.0.1:3000/user');
const client2 = ioClient('ws://127.0.0.1:3000/admin');


const appSocketClient = ioClient('ws://127.0.0.1:3000/admin', {
	auth: {
		
	}
});


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

export const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	// host: 'localhost',
	user: process.env.DB_USER,
	// user: 'root',
	password: process.env.DB_PWD,
	// password: '0000',
	database: process.env.DB_NAME,
	port: 3306,
	// database: 'test',
	connectionLimit: Number(process.env.DB_POOL_SIZE),
	ssl: process.env.DB_SSL === '1',
	collation: 'UTF8MB4_GENERAL_CI',
	timezone: '+00:00',
});

// import './utils/schedule';

app.get('/ping', (req, res) => {
	res.status(200).send('pong\n');
});

app.post('/ping', (req, res) => {
	console.log(req.body);

	res.status(200).send('susscess');
});

// const conn = pool.getConnection().then((res) => {
// 	const startDate = moment.utc(1679846400000).format('YYYY-MM-DD HH:mm:ss');
// 	const endDate = moment.utc(1679932799999).format('YYYY-MM-DD HH:mm:ss');

// 	console.log(startDate, endDate);

// 	const sql = `select * from \`maintenance\` where \`reserved_date\` between ${startDate} AND ${endDate}`;
// 	console.log(sql);

// 	res.query(`select * from \`maintenance\` where \`reserved_date\` between '${startDate}' AND '${endDate}'`).then(
// 		(results) => {
// 			// console.log(results);
// 			console.log(results);

// 			results.forEach((e: any) => {
// 				console.log(e['factory_name'], e['reserved_date']);
// 				console.log(moment(e['reserved_date']).format('YYYY-MM-DD HH:mm:ss'));
// 			});
// 		},
// 	);
// })

app.get('/getdata', async (req, res) => {
	const conn = await pool.getConnection();
	const sql = 'SELECT * FROM `message` WHERE `category` = 7 ORDER BY `created_at` DESC LIMIT 5';
	const query = await conn.query(sql);
	console.log(query);
	res.status(200).send('done');
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

app.use('/appsocket/', );
app.use('/coldchain/', coldchainRouter);

app.get('/socket/joinroom', async (req, res) => {
	const client = ioClient('ws://127.0.0.1:3000/user');
	client.connect();

	setTimeout(() => {
		client.disconnect();
	}, 1000 * 10);

	res.status(200).send('new user');
});

app.get('/send/message', async (req, res) => {
	const { a, b, c } = req.query;

	client1.emit('subscribe', { a, b, c });
	client1.emit('subscribe', { b, a, c: a });

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

initSocketIO(server);

setTimeout(() => {
	const socketRes1 = client1.connect();
	const socketRes2 = client2.connect();

	setTimeout(() => {
		console.log(socketRes1.connected, socketRes2.connected);
	}, 300);
}, 1000);

// console.log(convertDateArr2(1679328000000, 1679414399000));

// console.log(
// 	JSON.parse(
// 		'{"journeyCode":230321010001,"dataCount":0,"time":1679363818938,"deviceId":"","carStatus":1,"enabledCode":"N457LYLGVC","vincode":"XZU640-4019315","fenceId":[],"driverUid":"17321769261853639291","gps":{"longitude":121.459346,"latitude":25.063874,"speed":0,"speedLimit":0,"azimuth":304.83},"telecommunications":{"imsi":""},"can":{"totalMileage":2020.3,"accumulatedMileage":0,"canSpeed":0,"engine":{"engineTotalTime":115.3}},"event":[{"type":1,"startTime":1679363818938},{"type":4,"startTime":1679363818938}],"protocolVersion":"1","externalDevices":{"tpms":{},"coldChain":{"sensor1":{"temp":30}}}}',
// 	),
// );

console.log(moment.unix(1679500800000 / 1000));
console.log(moment.utc(1679500800000));

// console.log(moment.utc(1679500800000).format('YYYY-MM-DD HH:mm:ss'));
// console.log(moment(1679500800000).format('YYYY-MM-DD HH:mm:ss'));
// console.log(new Date(1679500800000));
// console.log(new Date(1679500800000).toLocaleString());

// console.log(moment.unix(1679500800).format('YYYY-MM-DD HH:mm:ss'));

export { app, server };
