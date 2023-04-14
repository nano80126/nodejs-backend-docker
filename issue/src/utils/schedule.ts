import { pick } from 'lodash';
import schedule, { scheduleJob } from 'node-schedule';

// import { pool } from '../app';

// scheduleJob('*/15 * * * * *', async () => {
// 	const conn = await pool.getConnection();
// 	let sql = "INSERT INTO `utc`(`id`, `col1`, `col2`, `created_at`) VALUES (null, '123', '456', null)";
// 	let res = await conn.query(sql);

// 	console.log(res);

// 	const now = new Date().getTime();

// 	sql = "INSERT INTO `utc`(`id`, `col1`, `col2`, `created_at`) VALUES (null, '123', '456', null)";
// 	res = await conn.query(sql);

// 	console.log(res);

// 	sql = 'SELECT * from `utc`;';
// 	res = await conn.query(sql);

// 	console.log(res);
// });
