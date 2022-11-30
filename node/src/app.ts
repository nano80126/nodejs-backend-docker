// import fasitfy from 'fastify';

// import child_process from 'child_process';
// import { Worker } from 'worker_threads';
import cluster from 'cluster';
import { cpus } from 'os';
// import dotenv from 'dotenv';

// 確認為主 process
if (cluster.isPrimary) {
	const numCPUs = cpus().length;
	console.log(`CPUs: ${numCPUs}`);

	for (let i = 0; i < numCPUs / 2; i++) {
		const wk = cluster.fork();

		wk.on('online', () => {
			wk.send(`worker ${i}`);
		});
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker exit ${worker.process.pid} ${code} ${signal}`);
	});

	cluster.on('message', (worker, msg) => {
		console.log(msg);
	});
} else {
	require('./work');
}
