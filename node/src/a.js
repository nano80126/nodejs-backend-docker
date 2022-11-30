console.log('start');

process.nextTick(() => {
	console.log('nexttick1');
});

setTimeout(() => {
	console.log('settimeout');
}, 0);

new Promise((resolve) => {
	console.log('promise');
	resolve('resolve');
}).then((res) => {
	console.log(`${res}`);
});

(async () => {
	console.log('async');
})();

setImmediate(() => {
	console.log('setimmediate');
});

process.nextTick(() => {
	console.log('nexttick2');
});

console.log('end');
